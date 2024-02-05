import { FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { FormContext } from "@/context/FormContext.tsx";
import { CardContent, CardFooter } from "@/components/ui/card.tsx";
import FileInput from "@/components/form/FileInput.tsx";
import SubmitButton from "@/components/form/SubmitButton.tsx";
import { isForm2Filled } from "@/lib/form-utils.ts";
import { FORM_ROUTES } from "@/routes/form-routes.ts";

export default function FormThreePage() {
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const formData = useContext(FormContext);

  // Navigate to form 2 if not filled
  if (!isForm2Filled(formData)) return <Navigate to={FORM_ROUTES.two} />;

  const {
    form1,
    form2,
    form3: { setIdFront, setIdBack, idFront, idBack },
  } = formData;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Reset errors
    setError1("");
    setError2("");

    // Make sure that both images are uploaded
    if (!idFront) setError1("Please upload your ID front.");
    if (!idBack) setError2("Please upload your ID back.");
    if (!idFront || !idBack) return;

    // Update the images
    setIdFront(idFront);
    setIdBack(idBack);

    const formData = new FormData();

    // Append routes 1 data
    const { email, password } = form1;
    formData.append("email", email);
    formData.append("password", password);

    // Append routes 2 data
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
    formData.append("first-name", firstName);
    formData.append("last-name", lastName);
    formData.append("phone", phone);
    formData.append("ssn", ssn);
    formData.append("home-address", homeAddress);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip-code", zipCode);
    formData.append("date-of-birth", dateOfBirth);

    // Append current routes data
    formData.append("id-front", idFront);
    formData.append("id-back", idBack);

    console.log(Array.from(formData));
  }

  return (
    <>
      <h1 className={"bg-[#dbe8f1] text-lg font-bold p-4 text-center"}>
        Verify your identity
      </h1>
      <CardContent className={"flex flex-col gap-y-10 px-20 py-5 mb-10"}>
        <form className={"flex flex-col gap-y-4"} onSubmit={onSubmit}>
          <h2 className={"text-lg font-bold p-4 text-center"}>
            Take photos of your identity document
          </h2>

          <FileInput name={"idFront"} onUpload={setIdFront}>
            Upload front of your identity
          </FileInput>
          {error1 && (
            <p className="p-4 bg-red-100 rounded border-destructive border text-destructive">
              {error1}
            </p>
          )}

          <FileInput name={"idBack"} onUpload={setIdBack}>
            Upload back of your identity
          </FileInput>
          {error2 && (
            <p className="p-4 bg-red-100 rounded border-destructive border text-destructive">
              {error2}
            </p>
          )}

          <SubmitButton disabled={!idFront || !idBack}>Continue</SubmitButton>
        </form>
      </CardContent>
      <CardFooter className={"p-0 bg-[#dbe8f1] text-center px-10 py-5"}>
        <p className={"p-4"}>
          Submitting a high-quality image of your document increases your
          likelihood of being verified the first time.
        </p>
      </CardFooter>
    </>
  );
}