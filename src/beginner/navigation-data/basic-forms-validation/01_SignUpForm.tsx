import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

interface SignUpValues {
  fullName: string
  email: string
  password: string
}

interface SignUpErrors {
  fullName?: string
  email?: string
  password?: string
}

const initialValues: SignUpValues = {
  fullName: '',
  email: '',
  password: '',
}

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validateSignUpForm = (values: SignUpValues): SignUpErrors => {
  const errors: SignUpErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required.'
  } else if (values.password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}

interface FormFieldProps {
  label: string
  value: string
  onChangeText: (value: string) => void
  placeholder: string
  error?: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address'
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
}: FormFieldProps): React.JSX.Element {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
        autoCorrect={false}
        style={[styles.input, error && styles.inputError]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

export default function SignUpForm(): React.JSX.Element {
  const [values, setValues] = useState<SignUpValues>(initialValues)
  const [errors, setErrors] = useState<SignUpErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateField = (field: keyof SignUpValues, value: string): void => {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)

    if (isSubmitted) {
      setErrors(validateSignUpForm(nextValues))
    }
  }

  const onSubmit = (): void => {
    const nextErrors = validateSignUpForm(values)
    setErrors(nextErrors)
    setIsSubmitted(true)

    if (Object.keys(nextErrors).length === 0) {
      setValues(initialValues)
      setErrors({})
    }
  }

  const isFormValid = Object.keys(validateSignUpForm(values)).length === 0

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.eyebrow}>Forms and Validation</Text>
        <Text style={styles.heading}>Create account</Text>
        <Text style={styles.description}>
          This example uses controlled inputs, inline validation, disabled
          states, and a typed validation helper.
        </Text>

        <View style={styles.card}>
          <FormField
            label="Full name"
            value={values.fullName}
            onChangeText={value => updateField('fullName', value)}
            placeholder="Enter your full name"
            error={errors.fullName}
          />

          <FormField
            label="Email address"
            value={values.email}
            onChangeText={value => updateField('email', value)}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <FormField
            label="Password"
            value={values.password}
            onChangeText={value => updateField('password', value)}
            placeholder="Minimum 8 characters"
            secureTextEntry
            error={errors.password}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !isFormValid }}
            disabled={!isFormValid}
            onPress={onSubmit}
            style={[styles.button, !isFormValid && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Create account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  screen: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#2563EB',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#B91C1C',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
})
