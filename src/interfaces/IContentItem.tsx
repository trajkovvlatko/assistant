export default interface IContentItem {
  key: string;
  user: string;
  note: string;
  at: string;
  dueDate?: string;
  genre?: string;
  duration?: number;
}
