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

![Image 1](./public/image1.png)

### Description for Image 1

![Image 2](./public/image2.png)

### The application is created fully responsive

![Image 3](./public/image3.png)

### Description for Image 3

![Image 4](./public/image4.png)

### Description for Image 4

![Image 5](./public/image5.png)

### img5

![Image 6](./public/image6.png)

### img6

![Image 7](./public/image7.png)

### As admin you can see all surveys, add new survey and handle themddd

![Image 8](./public/image8.png)

### You can edit a survey by adding or deleting a question

![Image 9](./public/image9.png)

### As admin you can also see results for each survey. The difference from the user result is this get advice button. If the average rating of a question is below 6 then this button appears here to take you to advice page

![Image 10](./public/image10.png)

### Let see how we can improve the communication in the team

![Image 11](./public/image11.png)

### This openAI support is based on scientific researches and proven experience, so the user can be sure that the method suggested are reliable. For each suggestion there is a reasoning, action to apply and the resources

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