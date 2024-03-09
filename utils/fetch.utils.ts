import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import api from "@/redux/API";
import { handleErrorResponse } from "./error.utils";
import userStore from "@/stores/user.store";
import { router } from "expo-router";
import { FlashMessage } from "@/components/Globals/FlashMessage";

interface FetchWrapperOptions {
  excludeAuthHeader: boolean;
}
export interface FetchResponseWrapper<T> {
  success: boolean;
  message: string;
  data: T;
}

export function unwrapErrors(
  errorObject: Record<string, string[]>
): { title: string; description: string }[] {
  const unwrappedErrors = [];

  for (const key in errorObject) {
    const title = key;
    const description = errorObject[key][0]; // Assuming the first element is the description

    unwrappedErrors.push({ title, description });
  }

  return unwrappedErrors;
}

export function objectToFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}

export function logFormData(formData: FormData) {
  console.log("Logging formdata...");
  if (formData && formData.values()) {
    for (let value of formData.values()) {
      console.log(value);
    }
  } else {
    console.log("Formdata is undefined");
  }
}

export function objectToHeaders(obj: any) {
  const headers = new Headers();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      headers.append(key, obj[key]);
    }
  }
  return headers;
}

export async function fetchGet<T>(
  url: string,
  headers: undefined | Headers = new Headers()
): Promise<T> {
  try {
    const token = userStore.getState().user?.token ?? null;

    const headers_ = objectToHeaders({
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      XAT: "U",
      "X-IDT": "A",
    });

    const response = await fetch(url, {
      method: "GET",
      headers: headers_,
    });
    handleSessionExpiry(response);

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
export async function axiosfetchGet<T>(
  url: string,
  headers?: RawAxiosRequestHeaders | AxiosHeaders
): Promise<T> {
  try {
    const response = await api.get(url, {
      headers,
    });
    return await response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
export async function axiosPost<T>(
  url: string,
  headers?: RawAxiosRequestHeaders | AxiosHeaders,
  data?: any
): Promise<T> {
  try {
    const response = await api.post(url, data, {
      headers: headers,
    });
    return await response.data;
  } catch (error: any) {
    handleErrorResponse(error);

    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchPost<T>(
  url: string,
  dataObject: Record<string, any>,
  noAuthHeader = false
): Promise<T> {
  const token = userStore.getState().getUser()?.token ?? null;
  const headers_ =
    noAuthHeader === false
      ? objectToHeaders({
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
          XAT: "U",
          "X-IDT": "A",
        })
      : new Headers({
          "content-type": "application/json",
        });

  const body = JSON.stringify(dataObject);
  console.log(body, "headers");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers_,

      body,
    });
    handleSessionExpiry(response);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchJson<T>(
  url: string,
  options: FetchWrapperOptions = {
    excludeAuthHeader: false,
  }
): Promise<T> {
  const token = userStore.getState().user?.token ?? null;
  const headers_ =
    options.excludeAuthHeader === false
      ? objectToHeaders({
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
          XAT: "U",
          "X-IDT": "A",
        })
      : new Headers();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers_,
    });
    handleSessionExpiry(response);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchWithFormData<T>(
  url: string,
  dataObject: Record<string, any>,
  method = "POST",
  headers: Headers = new Headers()
): Promise<T> {
  const formData = objectToFormData(dataObject);

  try {
    const response = await fetch(url, {
      method: method,
      body: formData,
      headers,
    });
    handleSessionExpiry(response);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function postFormData<T>(
  url: string,
  dataObject: Record<string, any>,
  headers: Headers = new Headers()
): Promise<T> {
  const formData = objectToFormData(dataObject);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers,
    });
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchWithParams<T>(
  url: string,
  params: { [key: string]: string | number | null | undefined },
  headersObj: { [key: string]: string } = {}
): Promise<T> {
  const filteredParams = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .reduce<{ [key: string]: string }>((acc, [key, value]) => {
      acc[key] = value as string;
      return acc;
    }, {});

  const searchParams = new URLSearchParams(filteredParams).toString();
  const fullUrl = searchParams ? `${url}?${searchParams}` : url;

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headersObj,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from:", url, error);
    throw error;
  }
}

const handleSessionExpiry = (response: Response) => {
  if (response.status == 403) {
    //  response.json().then((data) => console.log(data));
    FlashMessage("Session expired, please login again", "danger");
    userStore.getState().logout();
    router.replace("/auth/sign-in/");
  }
};
