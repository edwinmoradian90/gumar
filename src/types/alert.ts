export interface State {
  title: string;
  body: string;
  confirm: string;
  deny: string;
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  onDeny: () => void;
}
