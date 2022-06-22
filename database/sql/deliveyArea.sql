CREATE TABLE `delivery_areas` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`delivery_charge` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
    `type` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`status` TINYINT(1) NOT NULL DEFAULT '1',
	`data` JSON NOT NULL,
	`created_at` TIMESTAMP NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
;
