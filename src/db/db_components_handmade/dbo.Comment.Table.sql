USE SaymeDB
GO
CREATE TABLE dbo.Comment(
	id bigint PRIMARY KEY NOT NULL IDENTITY(1, 1),
	text nvarchar(256) NOT NULL,
	id_user bigint NOT NULL,
	id_post bigint NOT NULL,
)
GO
ALTER TABLE dbo.Comment  WITH CHECK ADD  CONSTRAINT FK_Comment_Post FOREIGN KEY(id_post)
REFERENCES dbo.Post (id)
GO
ALTER TABLE dbo.Comment CHECK CONSTRAINT FK_Comment_Post
GO
ALTER TABLE dbo.Comment  WITH CHECK ADD  CONSTRAINT FK_Comment_User FOREIGN KEY(id_user)
REFERENCES dbo.Users (id)
GO
ALTER TABLE dbo.Comment CHECK CONSTRAINT FK_Comment_User
GO