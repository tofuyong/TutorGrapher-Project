export interface LevelStream {
  [key: string]: string[];
}

export const LEVEL_STREAM: LevelStream = {
  'Primary': ['PSLE'],
  'Secondary': ['Express', 'Normal Academic', 'Normal Technical', 'Integrated Programme', 'International Baccalaureate'],
  'JC': ['A Levels Science', 'A Levels Arts'],
  'Polytechnic': ['Diploma'],
  'University': ['Degree', 'Masters', 'PHD']
}

export interface LevelYear {
  [key: string]: string[];
}

export const LEVEL_YEAR: LevelYear = {
  'Primary': ['1', '2', '3', '4', '5', '6'],
  'Secondary': ['1', '2', '3', '4', '5'],
  'JC': ['1', '2'],
  'Polytechnic': ['1', '2', '3', '4'],
  'University': ['1', '2', '3', '4', '5', '6']
}
