import { IonIcon } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import { useSettings } from "../../store/store";
import classNames from "classnames";

export default function GptIntro(this: any) {
  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);

  const handleSelectChange = (event: { target: { value: string; }; }) => {
    localStorage.setItem('selectedItem', event.target.value);
  }
  localStorage.setItem("selectedModal", selectedModel);
  // const isGptThreeSelected = selectedModel.startsWith("claude-opus");
  const isGptFourSelected = selectedModel.startsWith("AI Pregunta/Respuesta");
  const isGptDraftSelected = selectedModel.startsWith("AI Redactor");
  

  return (
    <>
      <div className="modals md:w-1/5 md:min-w-[500px] mx-2 relative flex items-center rounded-md justify-between mt-5 md:mx-auto  bg-gray-200 dark:bg-[#202123] gap-2">
        {/* <button
          title="CLAUDE-OPUS"
          className={classNames(
            "gpt3 uppercase  rounded-md  font-bold p-2 transition  flex-1 flex items-center  dark:text-white justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptThreeSelected,
              "opacity-50": !isGptThreeSelected,
            }
          )}
          type="button"
          onClick={() => setModel("claude-opus")}
        >
          <span
            className={classNames(" mr-2 transition", {
              "text-teal-400": isGptThreeSelected,
            })}
          >
            <i className="fa-solid fa-bolt "></i>
          </span>
          <span className="mr-2">CLAUDE - OPUS</span>
        </button> */}

        <button
          title="Modo Pregunta/Respuesta"
          className={classNames(
            "gptd uppercase rounded p-2 transition  dark:text-white flex-1 flex  items-center justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptFourSelected,
              "opacity-50": !isGptFourSelected,
            }
          )}
          onClick={() => setModel("AI Pregunta/Respuesta")}
        >
          <span
            className={classNames("mr-2 transition", {
              "text-teal-400": isGptFourSelected,
            })}
          >
            <IonIcon icon={sparkles} />
          </span>
          <span className="mr-2">Modo Pregunta/Respuesta</span>
        </button>
{/* 
        <button
          title="Modo Redactor"
          className={classNames(
            "gpt4 uppercase rounded p-2 transition  dark:text-white flex-1 flex  items-center justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptDraftSelected,
              "opacity-50": !isGptDraftSelected,
            }
          )}
          onClick={() => setModel("AI Redactor")}
        >
          <span
            className={classNames("mr-2 transition", {
              "text-teal-400": isGptDraftSelected,
            })}
          >
            <i className="fa-light fa-bolt "></i>
          </span>
          <span className="mr-2">drafter</span>
        </button> */}
      </div>
      <div className=" h-96 flex items-start justify-center">
        {/* <h1 className=" text-4xl font-bold mt-5 text-center text-gray-300">
          LawGPT
        </h1> */}

      </div>

      {isGptDraftSelected && (

        
<div className="h-96 flex flex-col items-center justify-center text-white">

<div id="itemSelection" className="flex flex-col items-center">

  <div className="bg-red-500 text-white px-4 py-2 rounded">
    <p className="text-xl mt-5">Este feature sigue en beta temprano</p>
  </div>
<p className="text-xl mt-5">Selecciona el tipo de documento que quieres que escriba</p>

  <select id="itemList" className="bg-gray-700 text-white mt-2" onChange={handleSelectChange}>
    <option value="Demanda">Demanda</option>
    <option value="Querella">Querella</option>
    {/* Add more options as needed */}
  </select>
</div>

<p className="text-xl mt-5">Iniciemos con una descripcion de lo que necesitas en tu documento</p>

</div>
                )}

    </>
  );
}
