import { StyledTextarea, TextareaWrapper } from "./styled.module";

interface TextProps {
  label: string;
  rows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<TextProps> = ({ label, rows, value, onChange }) => {
  return (
    <TextareaWrapper>
      <label>{label}</label>
      <StyledTextarea value={value} rows={rows} onChange={onChange} />
    </TextareaWrapper>
  );
};
