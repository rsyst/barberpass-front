-- CreateTable
CREATE TABLE "Barber_shops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "Barber_shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barbers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "start_work" TIMESTAMP NOT NULL,
    "end_work" TIMESTAMP NOT NULL,
    "time_per_work" TIMESTAMP NOT NULL,
    "phone_number" TEXT NOT NULL,
    "barber_shop_id" TEXT NOT NULL,

    CONSTRAINT "Barbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP NOT NULL,
    "end" TIMESTAMP NOT NULL,
    "barber_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "work_amount" INTEGER NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "barber_shop_id" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barber_shops_email_key" ON "Barber_shops"("email");

-- CreateIndex
CREATE INDEX "Barber_shops_id_idx" ON "Barber_shops"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Barbers_email_key" ON "Barbers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Barbers_phone_number_key" ON "Barbers"("phone_number");

-- CreateIndex
CREATE INDEX "Barbers_id_idx" ON "Barbers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_document_key" ON "Clients"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_phone_number_key" ON "Clients"("phone_number");

-- CreateIndex
CREATE INDEX "Clients_id_idx" ON "Clients"("id");

-- CreateIndex
CREATE INDEX "Appointments_id_idx" ON "Appointments"("id");

-- CreateIndex
CREATE INDEX "Services_id_idx" ON "Services"("id");

-- CreateIndex
CREATE INDEX "Products_id_idx" ON "Products"("id");

-- AddForeignKey
ALTER TABLE "Barbers" ADD CONSTRAINT "Barbers_barber_shop_id_fkey" FOREIGN KEY ("barber_shop_id") REFERENCES "Barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barbers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_barber_shop_id_fkey" FOREIGN KEY ("barber_shop_id") REFERENCES "Barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
