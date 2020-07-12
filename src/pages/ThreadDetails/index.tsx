import React from 'react';
import { Container, TitleContainer, TextContainer, RowContainer } from './styles';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme, LinearProgress, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { getThreadById } from '../../api/ThreadResource';
import { getThreadComments } from '../../api/ThreadComments';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      width: 120,
      height: 120,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
      display: 'flex',
      flexDirection: 'row',
    },
    progressBar: {
      maxHeight: 0,
      minWidth: '99%'

    },
    gridListBar: {
      borderRadius: 10,
    },
    gridList: {
      width: 1350,
      padding: 50
    },
    nickname: {
      marginTop: 80,
    },
    comment: {
      marginBottom: 90
    }
  }),
)

const ThreadDetails: React.FC = () => {

  const { threadId } = useParams()
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [thread, setThread] = React.useState<any>()
  const [comments, setComments] = React.useState<any>()

  const fetchThread = React.useCallback(async () => {
    const thread = await getThreadById(threadId)
    setThread(thread)

    const comments = await getThreadComments(threadId)
    setComments(comments)
  }, [thread, comments])

  React.useEffect(() => {
    fetchThread()
  }, [])

  return (
    <RowContainer>
      {thread && comments
        ?
        <>
          <Container className={classes.comment}>
            <RowContainer className={classes.nickname}>
              <img src={thread.user.avatar.medium} className={classes.avatar} />
              <TextContainer>
                {thread.user.name}
              </TextContainer>
            </RowContainer>
            <RowContainer>
              <TitleContainer>
                <div dangerouslySetInnerHTML={{ __html: thread.title }} />
              </TitleContainer>
              <TextContainer>
                <div dangerouslySetInnerHTML={{ __html: thread.body }} />
              </TextContainer>
            </RowContainer>
          </Container>
          <RowContainer>
            <GridList cellHeight={70} className={classes.gridList} cols={1}>
              {
                comments.map((comment: any) => (
                  <GridListTile
                    key={comment.id}
                  >
                    <GridListTileBar
                      className={classes.gridListBar}
                      title={comment.comment}
                      subtitle={
                        <>
                          <img src={comment.user.avatar.medium} style={{ width: 20, height: 20, marginRight: 15 }} />
                          {`${comment.user.name} - ${new Date(comment.createdAt * 1000).toUTCString()}`}
                        </>
                      }
                    />

                  </GridListTile>
                ))
              }
            </GridList>
          </RowContainer>
        </>
        : <LinearProgress className={classes.progressBar} />
      }
    </RowContainer>
  )
}

export default ThreadDetails;