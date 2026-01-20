from fastapi import FastAPI
from agent import agent
from backend.schemas import StudyInput, StudyPlanOutput
import asyncio
import traceback

app = FastAPI(
    title="LOCKDOWN AI Agent",
    version="0.1.0"
)


@app.post("/generate-plan", response_model=StudyPlanOutput)
async def generate_plan(data: StudyInput):
    retries = 2

    for attempt in range(retries + 1):
        try:
            # Run the AI agent with enforced output schema
            result = await agent.run(
                data.model_dump(),
                result_type=StudyPlanOutput
            )
            return result.data

        except Exception as e:
            print("AGENT ERROR:")
            traceback.print_exc()

            # Final fallback after retries
            if attempt == retries:
                return StudyPlanOutput(
                    strategy="Fallback plan due to temporary AI issue",
                    plan=[
                        {
                            "day": "Day 1",
                            "tasks": [
                                "Review subject fundamentals",
                                "Light revision",
                                "Short practice session"
                            ]
                        }
                    ]
                )

            # small delay before retry
            await asyncio.sleep(1)
