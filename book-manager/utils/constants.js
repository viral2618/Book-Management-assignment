export const STATUS_OPTIONS = [
  { value: "want-to-read", label: "Want To Read" },
  { value: "reading", label: "Reading" },
  { value: "completed", label: "Completed" },
];

export function getStatusLabel(value) {
  const option = STATUS_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : value;
}
