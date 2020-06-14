select * from FACULTY;

delete  faculty where faculty ='Faculty';
commit;

update faculty set faculty_name='Test Faculty1' where faculty='Faculty';
commit;

delete pulpit where faculty = 'Eg';

select * from FACULTY;
select * from PULPIT;
select * from SUBJECT;
select * from AUDITORIUM_TYPE;
select * from AUDITORIUM;


-- DROP TABLE FACULTY
CREATE TABLE FACULTY
  (
   FACULTY      CHAR(10)      NOT NULL,
   FACULTY_NAME VARCHAR2(100), 
   CONSTRAINT PK_FACULTY PRIMARY KEY(FACULTY)   
  );
  
  -- DROP TABLE PULPIT
CREATE TABLE PULPIT 
(
 PULPIT       CHAR(20)      NOT NULL,
 PULPIT_NAME  VARCHAR2(200), 
 FACULTY      CHAR(10)      NOT NULL, 
 CONSTRAINT FK_PULPIT_FACULTY FOREIGN KEY(FACULTY)   REFERENCES FACULTY(FACULTY) on delete cascade,  
 CONSTRAINT PK_PULPIT PRIMARY KEY(PULPIT) 
 ); 
 
 -- DROP TABLE TEACHER
CREATE TABLE TEACHER
 ( 
  TEACHER       CHAR(20) NOT  NULL,
  TEACHER_NAME  VARCHAR2(100), 
  PULPIT        CHAR(20) NOT NULL, 
  CONSTRAINT PK_TEACHER  PRIMARY KEY(TEACHER), 
  CONSTRAINT FK_TEACHER_PULPIT FOREIGN   KEY(PULPIT)   REFERENCES PULPIT(PULPIT)on delete cascade  
 ) ;
 
 -- DROP TABLE SUBJECT 
CREATE TABLE SUBJECT
    (
     SUBJECT      CHAR(20)     NOT NULL, 
     SUBJECT_NAME VARCHAR2(100)  NOT NULL,
     PULPIT       CHAR(20)     NOT NULL,  
     CONSTRAINT PK_SUBJECT PRIMARY KEY(SUBJECT),
     CONSTRAINT FK_SUBJECT_PULPIT FOREIGN  KEY(PULPIT)  REFERENCES PULPIT(PULPIT)on delete cascade  
    );
    
-- DROP TABLE AUDITORIUM_TYPE 
create table AUDITORIUM_TYPE 
(
  AUDITORIUM_TYPE   char(10) constraint AUDITORIUM_TYPE_PK  primary key,  
  AUDITORIUM_TYPENAME  varchar2(60) constraint AUDITORIUM_TYPENAME_NOT_NULL not null         
);

-- DROP TABLE AUDITORIUM 
create table AUDITORIUM 
(
 AUDITORIUM           char(10) primary key,  -- код аудитории
 AUDITORIUM_NAME      varchar2(200),          -- аудитория 
 AUDITORIUM_CAPACITY  number(4),              -- вместимость
 AUDITORIUM_TYPE      char(10) not null      -- тип аудитории
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE) on delete cascade  
);

insert into faculty values('EG','Evil Genius');
insert into pulpit values('GGWP','Good Game Well Played','EG');
insert into subject values('SP','Support party', 'GGWP');
insert into auditorium_type values('zz','sleping');
insert into auditorium values('210','210',5, 'zz');
commit;