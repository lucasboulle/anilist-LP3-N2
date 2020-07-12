import React from 'react';
import { Container, RowContainer, LeftPanelContainer, RightPanelContainer, TextContainer, TitleContainer } from './styles';
import {
  makeStyles,
  Theme,
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  LinearProgress,
  Button
} from '@material-ui/core';
import { getTitleDetails } from '../../api/TitleResource';
import { getCharactersByIds } from '../../api/CharactersResource';
import { useParams } from 'react-router-dom';

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
    },
    progressBar: {
      maxHeight: 120,
      minWidth: '99%'
    },
    bannerImage: {
      width: 300,
      height: 400,
    },  
    genresContainer: {
      justifyContent: 'space-between',
      paddingLeft: 300,
      paddingRight: 300,
    },
    information: {
      justifyContent: 'space-between',
    }
  }),
)

const TitleDetails: React.FC = () => {

  const classes = useStyles()
  const { titleId } = useParams()
  const [page, setPage] = React.useState(0)
  const [title, setTitle] = React.useState<any>()
  const [characters, setCharacters] = React.useState<any>()

  const fetchTitleDetails = React.useCallback(async () => {
    const title = await getTitleDetails(titleId)
    setTitle(title)

    const characters = await getCharactersByIds(
      title.characters.edges.map((v: any) => v.id)
    )
    setCharacters(characters)
  }, [characters, title])

  React.useEffect(() => {
    fetchTitleDetails()
  }, [])

  return (
    <Container>
      {title && characters
        ?
        <>
          <LeftPanelContainer>
            <img src={title.coverImage.extraLarge} className={classes.bannerImage} />
            <Container className={classes.information}>
              <TitleContainer>
                {title.title.romaji}
              </TitleContainer>
              <TextContainer>
                <div dangerouslySetInnerHTML={{ __html: title.description }} />
              </TextContainer>
              <RowContainer className={classes.genresContainer}>
                {title.genres.map((genre: string) => (
                  <Button 
                    variant="contained" 
                    color="primary"
                    key={genre}
                  >
                      {genre}
                  </Button>
                ))}
              </RowContainer>
              <RowContainer className={classes.genresContainer}>
                <TextContainer>
                  {`Season Year: ${title.seasonYear}`}
                </TextContainer>
                <TextContainer>
                  {`Release Date: ${title.startDate.day}/${title.startDate.month}/${title.startDate.year}`}
                </TextContainer>
              </RowContainer>
            </Container>
          </LeftPanelContainer>
          <RightPanelContainer>
            <GridList cellHeight={180} className={classes.gridList} cols={12}>
              {
                characters.map((character: any) => (
                  <GridListTile key={character.id}>
                    <img src={character.image.large} />
                    <GridListTileBar
                      title={character.name.full}
                      subtitle={character.name.native}
                    />

                  </GridListTile>
                ))
              }
            </GridList>
          </RightPanelContainer>
        </>
        : <LinearProgress className={classes.progressBar} />
      }
    </Container>
  )
}

export default TitleDetails;