from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from model import *
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

@app.get("/today", response_class=HTMLResponse)
async def today(request: Request):
    return templates.TemplateResponse("today.html", {"request": request})

@app.get("/total", response_class=HTMLResponse)
async def total(request: Request):
    return templates.TemplateResponse("total.html", {"request": request})

@app.get("/today_review", response_class=HTMLResponse)
async def today_review(request: Request):
    return templates.TemplateResponse("today_review.html", {"request": request})

@app.get("/total_review", response_class=HTMLResponse)
async def total_review(request: Request):
    return templates.TemplateResponse("total_review.html", {"request": request})

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

@app.get("/home")
async def home():
    with open("./images/home.png", 'rb') as im_png:
        return StreamingResponse(io.BytesIO(im_png.read()), media_type="image/png")

@app.get("/len/{whatpage}")
async def len_my_wordlist(whatpage:str):
    if whatpage == "total":
        return len_wordlist(session=get_session(), word_model=word_list)
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/setting_date/{whatpage}")
async def set_date(whatpage:str):
    if whatpage == "total":
        if setting_date(get_session(), word_list):
            return True
        else:
            return False
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/memorization/{whatpage}/{id}/{offset}")
async def checked_memorization(whatpage:str, id:int, offset:int=100000000):
    if whatpage == "total":
        return select_word(session=get_session(), word_model=word_list, index=id, offset=offset)
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/plus/{whatpage}/{id}")
async def plus_word_web(whatpage:str, id:int):
    if whatpage == "total":
        return plus_word(session=get_session(), word_model=word_list, index=id)
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/reset/{whatpage}/{id}")
async def reset_word_web(whatpage:str, id:int):
    if whatpage == "total":
        return reset_word(session=get_session(), word_model=word_list, index=id)
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/real_id/{whatpage}/{id}/{memory_count}")
async def calling_real_id(whatpage:str, id:int, memory_count:int):
    if whatpage == "total":
        return call_real_id(session=get_session(), word_model=word_list, real_id=id, mem_count = memory_count)
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/today_word_list/{whatpage}")
async def today_word_list(whatpage:str):
    if whatpage == "total":
        return today_inserted_words(session=get_session(), word_model=word_list)
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/today_to_total/{whatpage}")
async def today_to_total(whatpage:str):
    if whatpage == "total":
        if today_word_to_total_word(session=get_session(), word_model=word_list):
            return True
        else:
            return HTTPException(status_code=404, detail="something wrong")
    else:
        return HTTPException(status_code=404, detail="invalid page")

@app.get("/today_to_done/{whatpage}")
async def today_to_done(whatpage:str):
    if whatpage == "total":
        if today_word_to_done(session=get_session(), word_model=word_list):
            return True
        else:
            return HTTPException(status_code=404, detail="something wrong")
    else:
        return HTTPException(status_code=404, detail="invalid page")


@app.get("/", response_class=RedirectResponse)
def root() -> str:
    return "/first_page"

if __name__ == "__main__":
    import os
    os.system("uvicorn main:app --reload")