from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from model import get_session, select_word, word_list, today, accumulated
import io
from starlette.responses import StreamingResponse

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
	allow_headers=["*"],
)

app.mount("/templete", StaticFiles(directory="templete"), name="templete")
app.mount("/javascript", StaticFiles(directory="javascript"), name="javascript")


templates = Jinja2Templates(directory="templete")


@app.get("/first_page", response_class=HTMLResponse)
async def first_page(request: Request):
    return templates.TemplateResponse("first_page.html", {"request": request})

@app.get("/today.html", response_class=HTMLResponse)
async def today(request: Request):
    return templates.TemplateResponse("today.html", {"request": request})

@app.get("/total.html", response_class=HTMLResponse)
async def total(request: Request):
    return templates.TemplateResponse("total.html", {"request": request})

@app.get("/o_button")
async def o_button():
    with open("./images/O_button.png", 'rb') as im_png:
        return StreamingResponse(io.BytesIO(im_png.read()), media_type="image/png")

@app.get("/x_button")
async def x_button():
    with open("./images/X_button.png", 'rb') as im_png:
        return StreamingResponse(io.BytesIO(im_png.read()), media_type="image/png")

@app.get("/return_button")
async def return_button():
    with open("./images/return_button.jpg", 'rb') as im_jpg:
        return StreamingResponse(io.BytesIO(im_jpg.read()), media_type="image/jpg")

@app.get("/memorization/{whatpage}/{id}")
async def checked_memorization(whatpage:str, id:int):
    if whatpage == "total":
        return select_word(session=get_session(), word_model=word_list, index=id)
    elif whatpage == "today":
        return select_word(session=get_session(), word_model=today, index=id)
    elif whatpage == "accumulate":
        return select_word(session=get_session(), word_model=accumulated, index=id)
    else:
        return HTTPException(status_code=404, detail="invalid page")


if __name__ == "__main__":
    import os
    os.system("uvicorn main:app --reload")