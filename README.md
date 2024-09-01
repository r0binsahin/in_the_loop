# This is IN THE LOOP

## A survey application created for continuous feedback and instant result

An app that answers the challenge of building and maintaining a positive office culture. Employers often struggle to get honest feedback from their employees, leading to disengagement, low morale and eventually more people quitting. In the Loop transforms employee feedback into actionable insights.
By collecting real-time data from surveys we generate dynamic graphs, gauges and also give suggestions for improvements. This allows for: quick assessment of the organizational health, helps with monitoring of important key factors, continuous improvements over time.For employees, it offers an engaging way to voice their opinions and see the improved changes.

### The Team

| [![Robin Sahin](https://github.com/r0binsahin.png?size=100)](https://github.com/r0binsahin) | [![Magdalena Karpinska](https://github.com/magdalena-karpinska.png?size=100)](https://github.com/magdalena-karpinska) | [![Jonathan Zeray](https://github.com/JonathanZeray.png?size=100)](https://github.com/JonathanZeray) | [![Kenny Dinh](https://github.com/iiiamken.png?size=100)](https://github.com/iiiamken) |
|:---:|:---:|:---:|:---:|
| **Robin Sahin**   | **Magdalena Karpinska** | **Jonathan Zeray** | **Kenny Dinh**  |

### TRY IT HERE

[in-the-loop.vercel.app](https://in-the-loop.vercel.app/surveys/1)

## TECH STACK

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-FF4136?style=for-the-badge&logo=drizzle&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-0069ff?style=for-the-badge&logo=clerk&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A67D8?style=for-the-badge&logo=daisyui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## TABLES

```mermaid
erDiagram
    SURVEYS {
        int id PK
        int user_amount
        timeStamp created_at
    }
    QUESTIONS {
        int id PK
        text text
        int survey_id FK
        timeStamp created_at
    }
    ANSWERS {
        int id PK
        real rating
        int question_id FK
        timeStamp created_at
    }

    SURVEYS ||--o{ QUESTIONS : has
    QUESTIONS ||--o{ ANSWERS : has
```

## Application flow

<p align="center">
  <img src="./public/image1.png" alt="Image 1" />
  <br />
  <strong>Application flow</strong>
</p>

<p align="center">
  <img src="./public/image2.png" alt="Image 2" />
  <br />
  <strong>Survey start</strong>
</p>

<p align="center">
  <img src="./public/image3.png" alt="Image 3" />
  <br />
  <strong>The application is created fully responsive</strong>
</p>

<p align="center">
  <img src="./public/image4.png" alt="Image 4" />
  <br />
  <strong>Use the slider to set a rating</strong>
</p>

<p align="center">
  <img src="./public/image5.png" alt="Image 5" />
  <br />
  <strong>After submitting, the user is redirected to the result page</strong>
</p>

<p align="center">
  <img src="./public/image6.png" alt="Image 6" />
  <br />
  <strong>Here the current average of the whole survey, the changes over time, and average rating per question and changes over time per question are presented</strong>
</p>

<p align="center">
  <img src="./public/image7.png" alt="Image 7" />
  <br />
  <strong>Average rating per question and changes over time per question</strong>
</p>

<p align="center">
  <img src="./public/image8.png" alt="Image 8" />
  <br />
  <strong>As admin you can see all surveys, add new surveys, and handle them</strong>
</p>

<p align="center">
  <img src="./public/image9.png" alt="Image 9" />
  <br />
  <strong>You can edit a survey by adding or deleting a question</strong>
</p>

<p align="center">
  <img src="./public/image10.png" alt="Image 10" />
  <br />
  <strong>As admin you can also see results for each survey. The difference from the user result is this get advice button. If the average rating of a question is below 6 then this button appears here to take you to the advice page</strong>
</p>

<p align="center">
  <img src="./public/image11.png" alt="Image 11" />
  <br />
  <strong>Let's see how we can improve communication in the team</strong>
</p>

<p align="center">
  <img src="./public/image12.png" alt="Image 12" />
  <br />
  <strong>This OpenAI support is based on scientific research and proven experience, so the user can be sure that the methods suggested are reliable. For each suggestion, there is a reasoning, action to apply, and resources</strong>
</p>


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.