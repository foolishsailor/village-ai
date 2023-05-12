import { Tool } from 'langchain/tools';
import { google } from 'googleapis';

export class SearchWeb extends Tool {
  name: string;
  description: string;
  apiKey: string;
  searchEngineId: string;

  constructor(apiKey: string, searchEngineId: string) {
    super();
    this.name = 'Search Web';
    this.description = 'Searches the internet and returns a list of results';
    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
  }

  async _call(query: string) {
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
