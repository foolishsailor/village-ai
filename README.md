# village-ai
*** in development ***

![village-ai](./public/village-ai.png)

## It takes a village...

A village of AI, that is. This is a project to create a community of AI agents that can help each other learn and grow. The goal is to create a system that can be used to train AI agents to do anything.

One of the early apparent issues with groups of agents is the issue of them falling into error loops or spinning off into non-productive directions. The more agents you use the more likely this is to happen.

This project is an attempt to add Archetypes to agents to provide them with different personalities and goals. The idea is that the Archetypes will help keep the agents on track and prevent them from falling into error loops.

The idea for this approach came from the work done in this fascinating paper:

[Generative Agents: Interactive Simulacra of Human Behaviour](https://arxiv.org/pdf/2304.03442.pdf)

This project works directly with ['AI-Lens'](https://github.com/foolishsailor/ai-lens) that provide visualition of the agents and their interactions.

## How it works

### Clone

```bash
git clone https://github.com/foolishsailor/village-ai.git
```

### Install Dependencies

```bash
npm i
```

### Configure Settings

Create a local .env file in the root of the repo with the following:

```bash
OPENAI_API_KEY=YOUR_KEY_HERE # required
DEFAULT_MODEL=gpt-3.5-turbo # or gpt-4
```

### Install External Applications

[Chroma](https://www.trychroma.com/) local instance for a vector database

[Docker](https://www.docker.com/) to run Chroma in a local docker container.

#### 1. Download docker here: [Docker](https://www.docker.com/) and install

#### 2. Clone the Chroma repo. Place in same parent folder you have cloned this repo into

example:

```
- parent-folder
  - village-ai
  - chroma
```

```bash
cd 'parent-folder'
git clone https://github.com/chroma-core/chroma.git
```

### Run Chroma

You can either run chroma directly

```bash
cd chroma
docker-compose up -d --build
```

or run from village-ai

```bash
npm run start:chroma
```

### Run Village-ai

```bash
npm start
```

### Use It

You should now be able to interact with the agent via the terminal or via [AI-Lens](https://github.com/foolishsailor/ai-lens)

## Contact

If you have any questions, fin me on [Twitter](https://twitter.com/foolishsailor).
