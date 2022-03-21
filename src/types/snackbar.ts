export interface State {
  visible: boolean;
  message: string;
  onDismiss?: () => void;
  actionLabel?: string;
  actionOnpress?: () => void;
}
