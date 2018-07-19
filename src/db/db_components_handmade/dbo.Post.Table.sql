USE SaymeDB
GO
CREATE TABLE dbo.Post(
	id bigint PRIMARY KEY NOT NULL IDENTITY(1, 1),
	text nvarchar(256) NOT NULL,
	id_user bigint NOT NULL,
)
GO
ALTER TABLE dbo.Post  WITH CHECK ADD  CONSTRAINT FK_Post_User FOREIGN KEY(id_user)
REFERENCES dbo.Users (id)
GO
ALTER TABLE dbo.Post CHECK CONSTRAINT FK_Post_User
GO
