from os import stat
import re
from typing import Optional, Generator
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import date

import csv

class word_list(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    word: str
    meaning: str
    memory_count: int = 0
    sentence: Optional[str] = None
    inserted_date: Optional[str] = None
    is_total_visible: bool = False
    all_done = False


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def get_session() -> Generator:
    with Session(engine) as session:
        return session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def word_insert():
    with Session(engine) as session:
        with open('wordlist.csv', newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            for index, row in enumerate(reader):
                if index == 0:
                    continue
                word = word_list(word=row[0], meaning=row[1], memory_count=row[2], sentence=row[3])
                session.add(word)
            session.commit()

def select_word(session, word_model, index, offset=100000000):
    statement = select(word_model).where(word_model.memory_count < 3).where(word_list.id > index).where(word_list.id <= offset).where(word_model.is_total_visible == False)
    results = session.exec(statement).all()
    max_index = len(session.exec(select(word_model)).all())
    
    if len(results) > 0 and index < max_index:
        my_word = results[0]
        return my_word
    else:
        return "NO WORD LEFT"

def len_wordlist(session, word_model):
    statement = select(word_model).where(word_model.memory_count < 3).where(word_model.is_total_visible == False)
    results = session.exec(statement).all()
    return len(results)

def total_review_len_wordlist(session, word_model):
    statement = select(word_model).where(word_model.memory_count < 3).where(word_model.is_total_visible == True)
    results = session.exec(statement).all()
    return len(results)

def setting_date(session, word_model):
    statement = select(word_model).where(word_model.memory_count < 3).where(word_model.is_total_visible == False).limit(50)
    results = session.exec(statement).all()
    try:
        for word in results:
            word.inserted_date = date.today().isoformat()
            session.add(word)
        session.commit()
        session.refresh()
        return True
    except:
        return False

def plus_word(session, word_model, index):
    statement = select(word_model).where(word_model.id == index)
    results = session.exec(statement).all()
    max_index = len(session.exec(select(word_model)).all())
    
    if index < max_index:
        try:
            my_word = results[0]
            my_word.memory_count += 1
            session.add(my_word)
            session.commit()
            session.refresh(my_word)
            return {"real_id":my_word.id, "count":my_word.memory_count-1}
        except:
            return "update DB error"
    else:
        return "index out of range"

def reset_word(session, word_model, index):
    statement = select(word_model).where(word_model.id == index)
    results = session.exec(statement).all()
    max_index = len(session.exec(select(word_model)).all())
    
    if index < max_index:
        try:
            my_word = results[0]
            previous_count = my_word.memory_count
            my_word.memory_count = 0
            session.add(my_word)
            session.commit()
            session.refresh(my_word)
            return {"real_id":my_word.id, "count":previous_count}
        except:
            return "update DB error"
    else:
        return "index out of range"

def call_real_id(session, word_model, real_id, mem_count):
    statement = select(word_model).where(word_model.id == real_id)
    results = session.exec(statement).all()

    if results:
        my_word = results[0]
        my_word.memory_count = mem_count
        session.add(my_word)
        session.commit()
        session.refresh(my_word)
        return my_word
    else:
        "real id is invalid"

def today_inserted_words(session, word_model):
    today_date = date.today()
    statement = select(word_model).where(word_model.memory_count < 3).where(today_date.isoformat() == word_model.inserted_date).where(word_model.is_total_visible == False).where(word_model.all_done == False)
    results = session.exec(statement).all()
    return results

def today_word_to_total_word(session, word_model):
    today_date = date.today()
    statement = select(word_model).where(word_model.memory_count < 3).where(today_date.isoformat() == word_model.inserted_date).where(word_model.all_done == False)
    results = session.exec(statement).all()
    try:
        for word in results:
            word.is_total_visible = True
            session.add(word)
        session.commit()
        session.refresh()
        return True
    except:
        return False

def today_word_to_done(session, word_model):
    today_date = date.today()
    statement = select(word_model).where(word_model.memory_count < 3).where(today_date.isoformat() == word_model.inserted_date).where(word_model.is_total_visible == False).where(word_model.all_done == False)
    results = session.exec(statement).all()
    try:
        for word in results:
            word.memory_count = 3
            word.all_done = True
            session.add(word)
        session.commit()
        session.refresh(results)
        return True
    except:
        return False

def total_inserted_words(session, word_model):
    statement = select(word_model).where(word_model.is_total_visible == True)
    results = session.exec(statement).all()
    return results

def total_review_selector(session, word_model, index):
    statement = select(word_model).where(word_model.memory_count < 3).where(word_list.id > index).where(word_model.is_total_visible == True).where(word_model.all_done == False)
    results = session.exec(statement).all()
    max_index = len(session.exec(select(word_model).where(word_model.is_total_visible == True)).all())
    
    if len(results) > 0 and index < max_index:
        my_word = results[0]
        return my_word
    else:
        return "NO WORD LEFT"

def total_word_study(session, word_model):
    statement = select(word_model).where(word_model.is_total_visible == True)
    results = session.exec(statement).all()
    try:
        for word in results:
            word.memory_count = 0
            session.add(word)
        session.commit()
        session.refresh(results)
        return True
    except:
        return False

def total_word_to_done(session, word_model):
    statement = select(word_model).where(word_model.is_total_visible == True)
    results = session.exec(statement).all()
    try:
        for word in results:
            word.memory_count = 3
            word.all_done = True
            word.is_total_visible = False
            session.add(word)
        session.commit()
        session.refresh(results)
        return True
    except:
        return False

def main():
    create_db_and_tables()
    word_insert() 
    print(select_word(get_session(), word_list, 1))

if __name__ == "__main__":
    main()