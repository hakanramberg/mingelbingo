CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  position INTEGER NOT NULL,
  statement TEXT NOT NULL,
  answer_name TEXT NOT NULL DEFAULT ''
);

INSERT INTO settings (key, value) VALUES ('columns', '4');
INSERT INTO settings (key, value) VALUES ('revision', '1');

INSERT INTO prompts (position, statement, answer_name) VALUES
  (0, 'Har bott och jobbat i Kina', ''),
  (1, 'Har coachat ett handbollslag till topp 6 i Ungdoms-SM', ''),
  (2, 'Har studerat i USA', ''),
  (3, 'Har dansat Bollywood-dans på bröllop i Indien', ''),
  (4, 'Har stort ölintresse och eget bryggeri', ''),
  (5, 'Har tävlat i Gladiatorerna', ''),
  (6, 'Är rankad topp 650 i världen i flipper', ''),
  (7, 'Joggade över 40 halvmaror under två år', ''),
  (8, 'Har ett starkt kärleksförhållande till tv-spel', ''),
  (9, 'Har tagit livet av sig i en teaterpjäs', ''),
  (10, 'Har hälsat på kungaparet', ''),
  (11, 'Tycker inte om att äta kyckling', ''),
  (12, 'Har rekord i antal pokaler för träningsflit i fotboll', ''),
  (13, 'Är fotbollstränare', ''),
  (14, 'Är ett stort fan av Kim Larsen', ''),
  (15, 'Har spelat i ett band som hette ”Lesbian Seagulls”', '');
