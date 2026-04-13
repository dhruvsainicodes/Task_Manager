import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  tasks: Task[];
}

const createTasks = (names: string[]) => 
  names.map(name => ({ id: uuidv4(), name, completed: false }));

export const initialCategories: Category[] = [
  {
    id: uuidv4(),
    name: "Languages",
    tasks: createTasks(["C", "C++", "JavaScript", "TypeScript", "Java", "Python"])
  },
  {
    id: uuidv4(),
    name: "Frontend",
    tasks: createTasks(["HTML 5", "CSS 3", "Bootstrap", "ReactJs", "Redux", "NextJs"])
  },
  {
    id: uuidv4(),
    name: "Backend",
    tasks: createTasks(["NodeJS", "ExpressJS", "SpringBoot", "Redis"])
  },
  {
    id: uuidv4(),
    name: "DataBases",
    tasks: createTasks(["MySql", "PostgreSql", "MongoDB"])
  },
  {
    id: uuidv4(),
    name: "Data Analytics",
    tasks: createTasks(["NumPy", "Pandas", "MatplotLib", "Seaborn", "PowerBI"])
  },
  {
    id: uuidv4(),
    name: "AI/ML",
    tasks: createTasks(["Scikit Learn", "TensorFlow", "PyTorch", "NLTK", "Spacy", "Rag", "LLM (transformers)"])
  },
  {
    id: uuidv4(),
    name: "CS Fundamentals",
    tasks: createTasks(["DSA", "DBMS", "OOPs", "Operating Systems", "Computer Network", "System Design"])
  },
  {
    id: uuidv4(),
    name: "Tools Kit",
    tasks: createTasks(["Git", "GitHub", "Docker", "Postman", "Claude", "n8n", "Linux"])
  }
];
