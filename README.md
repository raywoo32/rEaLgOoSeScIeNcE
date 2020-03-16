# Real Goose Science

Using [Ng Wai Foong's](https://medium.com/@ngwaifoong92/beginners-guide-to-retrain-gpt-2-117m-to-generate-custom-text-content-8bb5363d8b7f) guide to training GPT-2 to generate fake scientific abstracts relating to geese. For more information on dataset gathering please see ./htmlScraping/articleGatheringProcedure.txt 

### Prerequisites

Please follow Ng Wai Foong's Setup and Installation guide. The files are too beefy for me to include in my repo. I put all of those files in ./pytorch and also initialized my venv there. 

PLEASE NOTE: aside from the stuff in requirements.txt,  I also had to install numpy 

## Information for Collaborators 

All needed data is in ./Data

jsonData.zip is the 3000 scraped articles, PLEASE NOTE this is not post processed. gooseTitleTraining.txt is the post-processed titles from the scraped articles. gooseAbstractTraining.txt is the post-processed abstracts from the scraped dataset. 

Everything in htmlScraping is just scripts, for data gathering, you probably don't need it. If you run them sucks to be  you because they just write to your directories willy nilly. 

## Citations

* [1](https://medium.com/@ngwaifoong92/beginners-guide-to-retrain-gpt-2-117m-to-generate-custom-text-content-8bb5363d8b7f)
* 

### These are just notes for me don't judge 

#### Activate Virtual Environment 

./ml/venv/geese/Scripts/activate

#### Make Encoded Data (in src of gpt-2)
python ./encode.py ../../Data/gooseTitleTraining.txt ../../Data/gooseTitleTraining.npz

python ./encode.py ../../Data/gooseAbstractTraining.txt ../../Data/gooseAbstractTraining.npz

python ./ml/gpt-2/encode.py ./Data/gooseAbstractTraining.txt ./Data/gooseAbstractTraining.npz
