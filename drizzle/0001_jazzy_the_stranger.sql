CREATE TABLE `contact_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`subject` text NOT NULL,
	`priority` text NOT NULL,
	`message` text NOT NULL,
	`company` text,
	`website` text,
	`job_title` text,
	`newsletter` integer DEFAULT false,
	`created_at` integer
);
