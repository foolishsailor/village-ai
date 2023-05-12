import { Tool } from 'langchain/tools';
import { google } from 'googleapis';
import chalk from 'chalk';

export class SearchWeb extends Tool {
  name: string;
  description: string;
  apiKey: string;
  searchEngineId: string;

  constructor(apiKey: string, searchEngineId: string) {
    super();
    this.name = 'search-web';
    this.description = 'Searches the internet and returns a list of results';
    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
  }

  async _call(query: string) {
    console.log('SearchWeb._call', chalk.magenta(query));

    const { data } = await google.customsearch('v1').cse.list({
      q: query,
      cx: this.searchEngineId,
      key: this.apiKey
    });

    return data.items
      ? `Search results:\n\n${data.items
          .map((item) => `- Title: "${item.title}"\n  URL: ${item.link}`)
          .join('\n\n')}`
      : 'Web search returned no results.';
  }
}
