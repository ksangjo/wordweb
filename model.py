from os import stat
import re
from typing import Optional, Generator
from sqlmodel import Field, Session, SQLModel, create_engine, select

import csv

class word_list(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    word: str
    meaning: str
    memory_count: int = 0
    sentence: Optional[str] = None

class today(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    word: str
    meaning: str
    memory_count: int = 0
    sentence: Optional[str] = None

class accumulated(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    word: str
    meaning: str
    memory_count: int = 0
    sentence: Optional[str] = None

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

def select_word(session, word_model, index):
    statement = select(word_model).where(word_model.memory_count < 3).where(word_list.id > index)
    results = session.exec(statement).all()
    max_index = len(session.exec(select(word_model)).all())
    
    if index < max_index:
        return results[0]
    else:
        return "NO WORD LEFT"

def len_wordlist(session, word_model):
    statement = select(word_model).where(word_model.memory_count < 3)
    results = session.exec(statement).all()
    return len(results)

def plus_word(session, word_model, index):
    statement = select(word_list).where(word_list.id == index)
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
    statement = select(word_list).where(word_list.id == index)
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
    statement = select(word_list).where(word_list.id == real_id)
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

def main():
    create_db_and_tables()
    word_insert() 
    print(select_word(get_session(), word_list, 1))

if __name__ == "__main__":
    main()