export interface QuestionData {
  _id: string;
  question: string;
  answer: string;
  correctOption: number;
  options: string[];
}

export interface CategoryData {
  _id: string;
  name: string;
  cover: string;
}
