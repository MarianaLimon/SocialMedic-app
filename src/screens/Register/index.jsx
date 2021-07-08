import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getSpecialties } from "../../services/specialties";
import { postUser } from "../../services/users";
import banner from "../../img/doctor-banner.png";
import Input from "../../components/commons/AppInput";
import AppCheckbox from "../../components/commons/AppCheckbox";
import AppButton from "../../components/commons/AppButton";
import AppSelect from "../../components/commons/AppSelect";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./index.css";
//
import AppImage from "../../components/commons/AppImage";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { DragDrop } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import "@uppy/drag-drop/dist/style.css";

//

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mother_lastname, setMotherLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [specialty_id, setSpecialtyId] = useState("");
  const [professional_license, setProfessionalLicense] = useState("");
  const [professional_license_url, setProfessionalLicenseUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [mother_lastnameError, setMotherLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password_confirmError, setPasswordConfirmError] = useState(false);
  const [specialty_idError, setSpecialtyIdError] = useState(false);
  const [professional_licenseError, setProfessionalLicenseError] =
    useState(false);
  const [professional_license_urlError, setProfessionalLicenseUrlError] =
    useState(false);
  const [termsError, setTermsError] = useState(false);

  let validForm = true;
  useEffect(() => {
    const request = async () => {
      const json = await getSpecialties();
      const arrayOptions = json.reduce(
        (accum, specialty) => (accum = [...accum, Object.values(specialty)]),
        []
      );
      setOptions(arrayOptions);
    };

    request();
  }, []);

  const history = useHistory();

  const printError = (feddback) => {
    return (
      <small
        className="text-danger"
        style={{ position: "absolute", marginTop: "-20px" }}
      >
        {feddback}
      </small>
    );
  };

  const handleValidation = () => {
    //console.log("validation");
    if (!isName(firstname) || firstname.length < 3) {
      validForm = false;
      setFirstnameError(true);
    } else {
      setFirstnameError(false);
    }
    if (!isName(lastname) || lastname.length < 3) {
      validForm = false;
      setLastnameError(true);
    } else {
      setLastnameError(false);
    }
    if (!isName(mother_lastname) || mother_lastname.length < 3) {
      validForm = false;
      setMotherLastnameError(true);
    } else {
      setMotherLastnameError(false);
    }
    if (!isEmail(email)) {
      validForm = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password.length < 6) {
      validForm = false;
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (password_confirm.length < 6 || password != password_confirm) {
      validForm = false;
      setPasswordConfirmError(true);
    } else {
      setPasswordConfirmError(false);
    }
    if (professional_license.length < 4) {
      validForm = false;
      setProfessionalLicenseError(true);
    } else {
      setProfessionalLicenseError(false);
    }
    if (specialty_id === "") {
      validForm = false;
      setSpecialtyIdError(true);
    } else {
      setSpecialtyIdError(false);
    }
    if (professional_license_url.length === "") {
      validForm = false;
      setProfessionalLicenseUrlError(true);
    } else {
      setProfessionalLicenseUrlError(false);
    }
    if (!checked) {
      validForm = false;
      setTermsError(true);
    } else {
      setTermsError(false);
    }
    return validForm;
  };

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function isName(name) {
    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    return regex.test(name);
  }

  function isPhone(phone) {
    var regex = /^[0-9]*$/;
    return regex.test(phone);
  }

  function isSpace(campo) {
    var regex = /^\s+|\s/;
    return regex.test(campo);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) {
      return false;
    }
    try {
      const newUser = {
        firstname,
        lastname,
        mother_lastname,
        email,
        password,
        password_confirm,
        specialty_id,
        professional_license,
        professional_license_url,
      };
      await postUser(newUser);
      history.push("/tnksregister");
    } catch (error) {
      console.log(error);
    }
  };

  /*const termins = () => {
    return <AppButton type="anchor" text="Términos y Condiciones" />;
  };*/

  //
  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  });

  uppy.use(Transloadit, {
    params: {
      auth: {
        key: "a67a160389ce4dfea1f8bb6c4d24a5bd",
      },
      template_id: "bca5c038a4f745ccbadaf9d83f924964",
    },
    waitForEncoding: true,
  });

  uppy.on("complete", (result) => {
    const url = result.successful[0].uploadURL;
    console.log(url);
    setProfessionalLicenseUrl(url);
  });

  const uploadLicense = () => {
    //console.log(professional_license_url);
    if (professional_license_url) {
      return (
        <div>
          <AppImage
            pathImage={professional_license_url}
            altImage="Professional License"
          />
        </div>
      );
    }
    return (
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropHereOr: "Arrastra la foto de cédula aqui ó %{browse}",
            // Used as the label for the link that opens the system file selection dialog.
            browse: "selecciona el archivo",
          },
        }}
      />
    );
  };
  //

  const checkLetters = (event) => {
    if (/[0-9+*%@#$&?=+_]/g.test(event.currentTarget.value)) {
      event.currentTarget.value = event.currentTarget.value.replace(
        /[0-9+*%@#$&?=+_]/g,
        ""
      );
    }
  };

  const checkNumbers = (event) => {
    if (/^\d{10}$/.test(event.currentTarget.value)) {
      event.currentTarget.value = event.currentTarget.value.replace(
        /^\d{10}$/,
        ""
      );
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="register-container container">
        <div className="row">
          <div className="col-md-6 my-4">
            <img src={banner} alt="" className="banner-register" />
          </div>
          <div className="form-wrapper col-md-6">
            <h1 className="my-4">REGISTRO</h1>
            <form onSubmit={handleSubmit} className="needs-validation">
              <Input
                id="firstname"
                placeholder="Nombre"
                type="text"
                value={firstname}
                /*onChange={(event) => setFirstname(event.target.value)}*/
                required
                onChange={(event) => {
                  if (/[0-9+*%@#$&?=+_]/g.test(event.currentTarget.value)) {
                    event.currentTarget.value =
                      event.currentTarget.value.replace(
                        /[0-9+*%@#$&?=+_]/g,
                        ""
                      );
                  }
                  setFirstname(event.target.value);
                }}
              />
              {firstnameError ? printError("Escriba su nombre") : null}
              <Input
                id="lastname"
                placeholder="Apellido Paterno"
                type="text"
                value={lastname}
                onChange={(event) => {
                  checkLetters(event);
                  setLastname(event.target.value);
                }}
                required
              />
              {lastnameError ? printError("Escriba su apellido paterno") : null}
              <Input
                id="mother_lastname"
                placeholder="Apellido Materno"
                type="text"
                value={mother_lastname}
                onChange={(event) => {
                  checkLetters(event);
                  setMotherLastname(event.target.value);
                }}
                required
              />
              {mother_lastnameError
                ? printError("Escriba su apellido materno")
                : null}
              <Input
                id="email"
                placeholder="Correo electrónico"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {emailError ? printError("Escriba un email valido") : null}
              <Input
                id="password"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {passwordError
                ? printError("Escriba un password de por lo menos 6 caracteres")
                : null}
              <Input
                id="password_confirm"
                placeholder="Confirme su contraseña"
                type="password"
                value={password_confirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                required
              />
              {password_confirmError
                ? printError("Confirme su password, debe ser identico")
                : null}
              <Input
                id="professional_license"
                placeholder="Cédula Profesional"
                type="text"
                value={professional_license}
                onChange={(event) => {
                  setProfessionalLicense(event.target.value);
                }}
                required
              />
              {professional_licenseError
                ? printError("Escriba su cédula profesional correctamente")
                : null}
              <AppSelect
                classSelect="AppInput_InputComponent__1j-T8"
                classLabel="col-12"
                idSelect="especialidad"
                placeholder="Especialidad"
                classContainerInput=""
                options={options}
                keyNameOption={1}
                keyNameValue={0}
                value={specialty_id}
                onChange={(event) => setSpecialtyId(event.target.value)}
              />
              {specialty_idError
                ? printError("Selecione su especialidad")
                : null}
              <Input
                id="professional_license_url"
                placeholder="Upload Foto Cédula"
                type="hidden"
                value={professional_license_url}
                onChange={(event) =>
                  setProfessionalLicenseUrl(event.target.value)
                }
                required
              />
              {uploadLicense()}
              {/* <AppCheckbox label={termins()}/> */}
              {/*<AppCheckbox
                id="name"
                defaultChecked={checked}
                onCheckboxChange={() => setChecked(!checked)}
                isSelected={checked}
                value={checked}
                label={`Acepto los ${(
                  <AppButton type="anchor" text="Términos y Condiciones" />
                )}`}
                />*/}
              <label>
                <input
                  type="checkbox"
                  onChange={() => setChecked(!checked)}
                  defaultChecked={checked}
                />{" "}
                Acepto los{" "}
                <AppButton type="anchor" text="Términos y Condiciones" />
              </label>
              <div>
                {termsError
                  ? printError("Acepte los terminos y condiciones")
                  : null}
              </div>
              <AppButton
                classButton="secondary w-50 d-block mx-auto my-5"
                type="submit"
                text="Registrar"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}