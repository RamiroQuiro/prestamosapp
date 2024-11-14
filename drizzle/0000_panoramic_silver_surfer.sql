CREATE TABLE `clientes` (
	`id` text PRIMARY KEY NOT NULL,
	`usuarioId` text,
	`dni` integer,
	`srcPhoto` text,
	`nombre` text NOT NULL,
	`apellido` text,
	`email` text NOT NULL,
	`celular` text,
	`direccion` text,
	`localidad` text,
	`provincia` text,
	`ciudad` text,
	`pais` text,
	`prestamosCount` integer DEFAULT 0,
	`srcDniFrente` text,
	`srcDniReverso` text,
	`updated_at` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clientes_id_unique` ON `clientes` (`id`);--> statement-breakpoint
CREATE TABLE `configuraciones` (
	`id` text PRIMARY KEY NOT NULL,
	`usuarioId` text,
	`tasaInteres` real NOT NULL,
	`periodos` integer NOT NULL,
	`numeroCuotas` integer NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `configuraciones_id_unique` ON `configuraciones` (`id`);--> statement-breakpoint
CREATE TABLE `cuotas` (
	`id` text PRIMARY KEY NOT NULL,
	`prestamoId` text,
	`clienteId` text,
	`usuarioId` text,
	`numeroCuota` integer NOT NULL,
	`fechaVencimiento` integer,
	`mora` integer DEFAULT false,
	`montoMora` real DEFAULT 0,
	`monto` real NOT NULL,
	`montoPagado` real DEFAULT 0,
	`pagada` integer DEFAULT false,
	`fechaPago` integer,
	FOREIGN KEY (`prestamoId`) REFERENCES `prestamos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cuotas_id_unique` ON `cuotas` (`id`);--> statement-breakpoint
CREATE TABLE `nCuotas` (
	`id` text PRIMARY KEY NOT NULL,
	`usuarioId` text,
	`value` integer NOT NULL,
	`selectDefault` integer DEFAULT false,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nCuotas_id_unique` ON `nCuotas` (`id`);--> statement-breakpoint
CREATE TABLE `intereses` (
	`id` text PRIMARY KEY NOT NULL,
	`usuarioId` text,
	`value` real NOT NULL,
	`selectDefault` integer DEFAULT false,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `intereses_id_unique` ON `intereses` (`id`);--> statement-breakpoint
CREATE TABLE `moraCuotas` (
	`id` text PRIMARY KEY NOT NULL,
	`usuarioId` text,
	`value` real DEFAULT 0,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `moraCuotas_id_unique` ON `moraCuotas` (`id`);--> statement-breakpoint
CREATE TABLE `pagos` (
	`id` text PRIMARY KEY NOT NULL,
	`prestamoId` text,
	`clienteId` text,
	`usuarioId` text,
	`cuotaId` text,
	`monto` real NOT NULL,
	`estado` text NOT NULL,
	`fechaPago` integer,
	`metodoPago` text,
	`lugarPago` text,
	FOREIGN KEY (`prestamoId`) REFERENCES `prestamos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cuotaId`) REFERENCES `cuotas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pagos_id_unique` ON `pagos` (`id`);--> statement-breakpoint
CREATE TABLE `pagoParciales` (
	`id` text PRIMARY KEY NOT NULL,
	`cuotaId` text,
	`prestamoId` text,
	`clienteId` text,
	`usuarioId` text,
	`monto` real NOT NULL,
	`fechaPago` integer,
	`metodoPago` text,
	`lugarPago` text,
	FOREIGN KEY (`cuotaId`) REFERENCES `cuotas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`prestamoId`) REFERENCES `prestamos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pagoParciales_id_unique` ON `pagoParciales` (`id`);--> statement-breakpoint
CREATE TABLE `prestamos` (
	`id` text PRIMARY KEY NOT NULL,
	`clienteId` text,
	`usuarioId` text,
	`montoTotal` real NOT NULL,
	`montoCuota` real NOT NULL,
	`capital` real NOT NULL,
	`tasaInteres` real NOT NULL,
	`modalidad` text DEFAULT 'mensual',
	`nCuotas` integer NOT NULL,
	`fechaInicio` integer,
	`fechaFin` integer,
	`montoRestante` real,
	`estado` text DEFAULT 'activo',
	`terminado` integer DEFAULT false,
	`updated_at` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prestamos_id_unique` ON `prestamos` (`id`);--> statement-breakpoint
CREATE TABLE `registroActividades` (
	`id` text PRIMARY KEY NOT NULL,
	`usuarioId` text,
	`actividad` text NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registroActividades_id_unique` ON `registroActividades` (`id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expiresAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`userName` text,
	`nombre` text,
	`apellido` text,
	`password` text,
	`dni` integer,
	`srcPhoto` text,
	`celular` text,
	`direccion` text,
	`localidad` text,
	`provincia` text,
	`ciudad` text,
	`pais` text,
	`formulaPersonalizada` text DEFAULT '(capital * ((tasaInteres / 100 / 12) * (1 + tasaInteres / 100 / 12) ^ cuotas)) / ((1 + tasaInteres / 100 / 12) ^ cuotas - 1)',
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);