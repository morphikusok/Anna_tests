import {
  generateId
} from "../utils.js";
import currentUser from "../current-user.js";
import storageService from "../storage-service.js";
import questionsTemplate from "../questions-template.js";
import { ROOT_DIV } from "../constants.js";

//* получение темплейта для формы вопросов
function collectQuestionsTemplate(event) {
  event.preventDefault();

  const formDdata = new FormData(event.target);

  const savedQuestionsTemplate = {
    owner: currentUser.userData.username,
    id: generateId(questionsTemplate.templates),
    description: formDdata.get('rsrchdescription'),
    additionalInformation: formDdata.getAll('additional-information'),
    numberOfQuestions: formDdata.get('questions-amount'),
    possibleAnswersType: formDdata.get('possible-answers'),
    ifRange: formDdata.getAll('variant-field')
  }

  questionsTemplate.saveTemplate(savedQuestionsTemplate);

  storageService.set('SavedQuestionsTemplate', JSON.stringify(questionsTemplate.templates));

  const { numberOfQuestions, id } = savedQuestionsTemplate;

  return {numberOfQuestions, id};
}

//* получение вопросов
export function collectQuestions(currId, event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const savedQuestions = {
    parentTemplateId: currId,
    questions: formData.getAll('qstn-description')
  }

  const currTemplate = questionsTemplate.getTemplateById(currId);
  const allFieldsNumber = ROOT_DIV.querySelectorAll('textarea').length;

  if (currTemplate.numberOfQuestions != allFieldsNumber) {
    currTemplate.numberOfQuestions = allFieldsNumber;
  }

  questionsTemplate.saveQuestions(savedQuestions);

  storageService.set('SavedQuestionsTemplate', JSON.stringify(questionsTemplate.templates));
  storageService.set('SavedQuestions', JSON.stringify(questionsTemplate.questions));
}

export default collectQuestionsTemplate;