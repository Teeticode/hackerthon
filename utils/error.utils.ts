import { FlashMessage } from "@/components/Globals/FlashMessage";
import {
  AuthErrorResponse,
  InternalErrorResponse,
  MissingPostDataResponse,
} from "@/types/global";
import { FormikErrors } from "formik";
import { showMessage } from "react-native-flash-message";
interface ValidationError {
  [key: string]: string[];
}

interface AltErrorResponse {
  data: {
    [key: string]: ValidationError;
  };
  error: boolean;
  msg: string;
}
export function handleErrorResponse<T>(
  resp: AuthErrorResponse | MissingPostDataResponse | Record<string, any>
) {
  if (resp?.detail?.length) {
    // console.log(resp, "jkljl;");
    // return FlashMessage(
    //   resp?.detail ?? "Something went wrong, please login",
    //   "default"
    // );
  } else {
    if (resp.data?.non_field_errors) {
      let combinedErrors: string[] = [];

      if (resp.data.non_field_errors) {
        combinedErrors = combinedErrors.concat(resp.data.non_field_errors);
      }

      if (resp.data.msg) {
        combinedErrors.push(resp.data.msg);
      }
      FlashMessage("Error", "danger", combinedErrors.join(", "));
    } else {
      if (resp.error && typeof resp.error !== "boolean") {
        const errors: string[] = [];

        Object.keys(resp.data).forEach((field) => {
          const fieldErrors = resp.data[field];
          const formattedErrors = fieldErrors.map(
            (error: string) => `${field}: ${error}`
          );
          errors.push(...formattedErrors);
        });

        return FlashMessage(errors.join("\n"), "danger");
      }
      if ("msg" in resp) {
        if ("data" in resp && resp.data && typeof resp.data === "object") {
          const errorFields: string[] = [];

          for (const key in resp.data) {
            if (Array.isArray(resp.data[key]) && resp.data[key]?.length > 0) {
              errorFields.push(
                `${key
                  ?.split("_")
                  ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  ?.join(" ")}: ${resp.data[key].join(", ")}`
              );
            }
          }

          if (errorFields?.length) {
            FlashMessage(
              `Fields are required or may not be blank: ${errorFields.join(
                "\n "
              )}`,
              "danger",
              "",
              5000
            );
            return;
          }
        } else if (typeof resp.msg === "string") {
          FlashMessage(resp.msg, "danger");
        }
        return;
      }
    }

    if (typeof resp?.msg === "string") {
      FlashMessage(resp.msg, "danger");
      return;
    }
  }
  console.log(resp.data);

  // FlashMessage("Unknown Error Occurred, Please try again", "danger");
}
export function formatValidationErrors(errorsObject: FormikErrors<any>) {
  let formattedErrors = "";

  for (const key in errorsObject) {
    if (errorsObject.hasOwnProperty(key)) {
      formattedErrors += `${key}: ${errorsObject[key]}\n`;
    }
  }

  return formattedErrors.trim();
}
interface ValidationErrors {}
