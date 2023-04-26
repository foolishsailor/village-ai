export const file = {
  writeFile: {
    description: 'Write a file to the file system',
    parameters: {
      path: {
        description: 'The path to the file to write'
      },
      content: {
        description: 'The content to write to the file'
      }
    },
    execute: () => {
      /*
      check if path is a string - if invalid path then return suggestion to look up help
      check if content is a string - if invalid content then return suggestion to look up help
      if invalid parameters then return suggestion to look up help
      */
    }
  },
  readFile: {
    description: 'Read a file from the file system',
    parameters: {
      path: {
        description: 'The path to the file to read'
      }
    },
    execute: () => {
      /*
      check if path is a string - if invalid path then return suggestion to look up help
      if invalid parameters then return suggestion to look up help
      */
    }
  },
  deleteFile: {
    description: 'Delete a file from the file system',
    parameters: {
      path: {
        description: 'The path to the file to delete'
      }
    },
    execute: () => {
      /*
      check if path is a string - if invalid path then return suggestion to look up help
      if invalid parameters then return suggestion to look up help
      */
    }
  }
};
