import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import MainMenu from "./MainMenu";

registerSheet("main-menu", MainMenu);

export interface MenuOptionsProps {
  options: {
    label: string;
    onPress: () => void;
    color?: string;
  }[];
  labelProperty: string;
  enabledSearch?: boolean;
}

declare module "react-native-actions-sheet" {
  interface Sheets {
    "main-menu": SheetDefinition<{
      payload: {
        options: MenuOptionsProps["options"];
        labelProperty: MenuOptionsProps["labelProperty"];
        enabledSearch?: MenuOptionsProps["enabledSearch"];
      };
    }>;
  }
}

export {};
