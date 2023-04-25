# village-ai

!['village-ai'](./public/village-ai.png)

## It takes a village...

A village of AI, that is. This is a project to create a community of AI agents that can help each other learn and grow. The goal is to create a system that can be used to train AI agents to do anything.

One of the early apparent issues with groups of agents is the issue of them falling into error loops or spining off into non-productive directions. The more agents you use the more likely this is to happen.

This project is an attempt to add Archetypes to agents to provide them with differnt personalities and goals. The idea is that the Archetypes will help keep the agents on track and prevent them from falling into error loops.

The idea for this approach to came from the work done in this fascinating paper:

['Generative Agents: Interactive Simulacra of Human Behaviour](https://arxiv.org/pdf/2304.03442.pdf)

This project works directly with ['AI-Lens'](https://github.com/foolishsailor/ai-lens) that provide visualition of the agents and their interactions.

## How it works

**Clone**

```bash
git clone https://github.com/foolishsailor/village-ai.git
```

**Install Dependencies**

```bash
npm i
```

**Configure Settings**

Create a local .env file in the root of the repo with the following:

```bash
OPENAI_API_KEY=YOUR_KEY_HERE # required
DEFAULT_MODEL=gpt-3.5-turbo # or gpt-4
```

**Install Chroma**

This project uses [Chroma](https://www.trychroma.com/) local instance for a vector database

Note: You will need [Docker](https://www.docker.com/) to run Chroma locally.

```bash
git clone https://github.com/chroma-core/chroma.git
```

**Run Chroma**

```bash
cd chroma
docker-compose up -d --build
```

**5. Run Script**

```bash
npm start
```

**6. Use It**

You should now be able to interact with the agent via the terminal or via the ['AI-Lens'](https://github.com/foolishsailor/ai-lens)

## Contact

If you have any questions, fin me on [Twitter](https://twitter.com/foolishsailor).
