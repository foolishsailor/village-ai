import { CODE_BLOCK_DELIMITER } from '@/config/defaults';
import { promptFormats } from './prompt-formats';

export const error = {
  noTextFound: `
  Your action could not be carried out because no text was found inside the delimiters - ${CODE_BLOCK_DELIMITER}.

  Remember to always format your entire response as an action, like this:
  ${promptFormats.defaultActionFormat}
  `
};
