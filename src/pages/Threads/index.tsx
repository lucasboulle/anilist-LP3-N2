import React from 'react';
import { Container, RowContainer, Text } from './styles';
import SearchBar from '../../components/SearchBar';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  LinearProgress,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import { Visibility, ChatBubble } from '@material-ui/icons';
import { getThreads } from '../../api/ThreadResource';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1450,
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
      borderRadius: 10
    }
  }),
)


const Threads: React.FC = () => {

  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [threads, setThreads] = React.useState<any>()

  const fetchThreads = React.useCallback(async (term?: string) => {
    const threads = await getThreads(page, term)
    console.log(threads)
    setThreads(threads)
  }, [threads])

  React.useEffect(() => {
    fetchThreads()
  }, [page])



  return (
    <Container>
      <RowContainer>
        <SearchBar onSearch={() => { }} />
      </RowContainer>
      <RowContainer>
        <GridList cellHeight={70} className={classes.gridList} cols={1}>
          {threads ?
            threads.map((thread: any) => (
              <GridListTile key={thread.id}>
                <GridListTileBar
                  className={classes.gridListBar}
                  title={thread.title}
                  subtitle={
                    <>
                      <img src={thread.user.avatar.medium} style={{width: 20, height: 20, marginRight: 15}}/>
                      {`${thread.user.name} - ${new Date(thread.createdAt * 1000).toUTCString()}`}
                    </>
                  }
                  actionIcon={
                    <div className={classes.icon}>
                      <Visibility fontSize={'small'} /> 
                      <Text>
                        {thread.viewCount}
                      </Text>
                      <ChatBubble fontSize={'small'} />
                      <Text>
                        {thread.replyCount}
                      </Text>
                    </div>
                  }
                />

              </GridListTile>
            ))
            : <LinearProgress className={classes.progressBar} />
          }
        </GridList>
      </RowContainer>
    </Container>
  )
}

export default Threads;