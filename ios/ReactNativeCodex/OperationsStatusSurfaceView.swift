import UIKit

@objc(OperationsStatusSurfaceView)
final class OperationsStatusSurfaceView: UIView {
  private let titleLabel = UILabel()
  private let badgeLabel = UILabel()
  private let subtitleLabel = UILabel()
  private let progressView = UIProgressView(progressViewStyle: .default)
  private let metaLabel = UILabel()
  private let stackView = UIStackView()
  private let headerRow = UIStackView()

  @objc var title: NSString = "" {
    didSet {
      titleLabel.text = title as String
    }
  }

  @objc var subtitle: NSString = "" {
    didSet {
      subtitleLabel.text = subtitle as String
    }
  }

  @objc var statusTone: NSString = "nominal" {
    didSet {
      applyTone(statusTone as String)
    }
  }

  @objc var progressValue: NSNumber = 0 {
    didSet {
      let normalizedValue = min(max(progressValue.floatValue, 0), 100)
      progressView.progress = normalizedValue / 100.0
    }
  }

  @objc var attentionCount: NSNumber = 0 {
    didSet {
      metaLabel.text = "Attention items: \(attentionCount.intValue)"
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    configureLayout()
    applyTone("nominal")
    progressView.progress = 0
    metaLabel.text = "Attention items: 0"
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
    configureLayout()
    applyTone("nominal")
    progressView.progress = 0
    metaLabel.text = "Attention items: 0"
  }

  private func configureLayout() {
    backgroundColor = UIColor(red: 15 / 255, green: 23 / 255, blue: 42 / 255, alpha: 1)
    layer.cornerRadius = 20
    layer.borderWidth = 1
    layer.borderColor = UIColor(red: 30 / 255, green: 41 / 255, blue: 59 / 255, alpha: 1).cgColor

    headerRow.axis = .horizontal
    headerRow.alignment = .center
    headerRow.distribution = .fill
    headerRow.spacing = 12

    titleLabel.font = UIFont.systemFont(ofSize: 18, weight: .bold)
    titleLabel.textColor = UIColor(red: 248 / 255, green: 250 / 255, blue: 252 / 255, alpha: 1)
    titleLabel.numberOfLines = 2
    titleLabel.setContentHuggingPriority(.defaultLow, for: .horizontal)

    badgeLabel.font = UIFont.systemFont(ofSize: 12, weight: .bold)
    badgeLabel.textColor = UIColor(red: 239 / 255, green: 246 / 255, blue: 255 / 255, alpha: 1)
    badgeLabel.textAlignment = .center
    badgeLabel.layer.cornerRadius = 14
    badgeLabel.clipsToBounds = true
    badgeLabel.setContentHuggingPriority(.required, for: .horizontal)

    subtitleLabel.font = UIFont.systemFont(ofSize: 14, weight: .regular)
    subtitleLabel.textColor = UIColor(red: 203 / 255, green: 213 / 255, blue: 225 / 255, alpha: 1)
    subtitleLabel.numberOfLines = 0

    progressView.progressTintColor = UIColor(red: 34 / 255, green: 197 / 255, blue: 94 / 255, alpha: 1)
    progressView.trackTintColor = UIColor(red: 30 / 255, green: 41 / 255, blue: 59 / 255, alpha: 1)

    metaLabel.font = UIFont.systemFont(ofSize: 12, weight: .bold)
    metaLabel.textColor = UIColor(red: 148 / 255, green: 163 / 255, blue: 184 / 255, alpha: 1)

    headerRow.addArrangedSubview(titleLabel)
    headerRow.addArrangedSubview(badgeLabel)

    stackView.axis = .vertical
    stackView.spacing = 12
    stackView.translatesAutoresizingMaskIntoConstraints = false

    stackView.addArrangedSubview(headerRow)
    stackView.addArrangedSubview(subtitleLabel)
    stackView.addArrangedSubview(progressView)
    stackView.addArrangedSubview(metaLabel)

    addSubview(stackView)

    NSLayoutConstraint.activate([
      stackView.topAnchor.constraint(equalTo: topAnchor, constant: 18),
      stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 18),
      stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -18),
      stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -18),
      badgeLabel.heightAnchor.constraint(equalToConstant: 28),
      badgeLabel.widthAnchor.constraint(greaterThanOrEqualToConstant: 92),
      progressView.heightAnchor.constraint(equalToConstant: 8),
    ])
  }

  private func applyTone(_ tone: String) {
    badgeLabel.text = tone.prefix(1).uppercased() + tone.dropFirst()

    let color: UIColor
    switch tone {
    case "critical":
      color = UIColor(red: 220 / 255, green: 38 / 255, blue: 38 / 255, alpha: 1)
    case "warning":
      color = UIColor(red: 217 / 255, green: 119 / 255, blue: 6 / 255, alpha: 1)
    case "maintenance":
      color = UIColor(red: 124 / 255, green: 58 / 255, blue: 237 / 255, alpha: 1)
    default:
      color = UIColor(red: 29 / 255, green: 78 / 255, blue: 216 / 255, alpha: 1)
    }

    badgeLabel.backgroundColor = color
  }
}
