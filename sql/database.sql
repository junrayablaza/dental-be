CREATE SCHEMA `dental`;

use `dental`;

CREATE TABLE `dentist` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) DEFAULT NULL,
	`specialization` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `lu_time_slots` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`time_start` time DEFAULT NULL,
	`time_end` time DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `appt` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`user_id` int DEFAULT NULL,
	`dentist_id` int DEFAULT NULL,
	`appt_date` date DEFAULT NULL,
	`time_slot_id` int DEFAULT NULL,
	`status_id` int DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `lu_appt_status` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`status` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) DEFAULT NULL,
	`contact_no` varchar(255) DEFAULT NULL,
	`address` LONGTEXT DEFAULT NULL,
	`email` varchar(255) DEFAULT NULL,
	`password` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `name_UNIQUE` (`email` ASC)
);

# -------------------------------------------------------------------------->

INSERT INTO `dentist` ( `name`, `specialization` ) VALUES 
('LORNA RAMOS ABAD', 'Preventive Care'),
('RAINERIO SION', 'Restorative Services'),
('MA TERESITA YUMUL', 'Cosmetic Dentistry'),
('SALVADOR MICLAT', 'Preventive Care'),
('DELFIN LIM', 'Restorative Services'),
('MICHELLE ESPINOZA', 'Cosmetic Dentistry'),
('MARIA TRULY DOLLY CINCO', 'Preventive Care'),
('JESSICA MARIE REYES', 'Restorative Services'),
('MARIA CRISTINA CALUAG', 'Cosmetic Dentistry'),
('FELICISIMO VALBUENA', 'Preventive Care');

INSERT INTO `lu_time_slots` 
(`time_start`, `time_end`) 
VALUES
('8:00', '9:00'),
('9:00', '10:00'), 
('10:00', '11:00'),
('11:00', '12:00'),
('12:00', '13:00'),
('13:00', '14:00'),
('14:00', '15:00'),
('15:00', '16:00'),
('16:00', '17:00');

INSERT INTO `lu_appt_status` ( `status` )
VALUES ('Booked'), ('Cancelled');