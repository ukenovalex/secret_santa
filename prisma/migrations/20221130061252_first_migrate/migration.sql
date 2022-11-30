-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT E'',
    "isSanta" BOOLEAN NOT NULL DEFAULT false,
    "isHasSanta" BOOLEAN NOT NULL DEFAULT false,
    "donee_id" INTEGER,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "WishModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_donee_id_key" ON "UserModel"("donee_id");

-- AddForeignKey
ALTER TABLE "WishModel" ADD CONSTRAINT "WishModel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO "UserModel"(name, email) VALUES ('Евгения Чазова', 'chazova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Иван Полькин', 'polkin@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Андрей Провков', 'provkov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Вячеслав Кузнецов', 'kuznecov_v@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Роза Шулятьева', 'shulyateva@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Саша Луткова', 'lutkova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Артур Вальтер', 'valter@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Павел Семёнов', 'semenov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Александр Сучков', 'suchkov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Егор Анисимов', 'anisimov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Валентина Ибрагимова', 'ibragimova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Екатерина Гришенкова', 'grishenkova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Анатолий Елютин', 'elyutin@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Женя Панкрашкин', 'pankrashkin@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Максим Харитонов', 'haritonov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Даниил Мальцев', 'malcev_daniil@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Иван Красиков', 'krasikov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Сергей Голов', 'golov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Регина Ягафарова', 'yagafarova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Вячеслав Рыков', 'rykov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Алексей Укенов', 'ukenov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Юлия Хомутинина', 'homutinina@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Артём Больных', 'bolnyh@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Регина Туманчина', 'tumanchina@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Михаил Лемешев', 'lemeshev@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Лев Еремеев', 'eremeev@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Наталья Денисова', 'denisova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Алексей Смирнов', 'smirnov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Евгений Гребенщиков', 'grebenshikov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Наталья Сыскова', 'syskova@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Алексей Качалков', 'kachalkov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Алексей Живодров', 'zhivodrov@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Сергей Злобин', 'zlobin@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Вячеслав Козицын', 'kozicyn@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Вадим Куксовский', 'kuksovskii@flagstudio.ru');
INSERT INTO "UserModel"(name, email) VALUES ('Миша Радионов', 'boss@flagstudio.ru');