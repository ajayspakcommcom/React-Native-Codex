import React from 'react'

import SignUpForm from './01_SignUpForm'
import { fireEvent, renderScreen, screen } from '../../../mid-level/testing/shared/test-utils'

describe('SignUpForm', () => {
  it('submits valid input and resets the form fields', () => {
    renderScreen(<SignUpForm />)

    fireEvent.changeText(screen.getByLabelText('Full name'), 'Ajay Singh')
    fireEvent.changeText(
      screen.getByLabelText('Email address'),
      'ajay@example.com',
    )
    fireEvent.changeText(screen.getByLabelText('Password'), 'securepass123')

    fireEvent.press(screen.getByRole('button', { name: 'Create account' }))

    expect(screen.getByLabelText('Full name').props.value).toBe('')
    expect(screen.getByLabelText('Email address').props.value).toBe('')
    expect(screen.getByLabelText('Password').props.value).toBe('')
  })
})
