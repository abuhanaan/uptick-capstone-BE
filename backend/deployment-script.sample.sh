EC2_USER={EC2_USER}
USERNAME={USERNAME} # to be used for pm2 service creation

# Database cred and other env variables
DATABASE_URL={{DATABASE_URL}}
AWS_ACCESS_KEY_ID={{AWS_ACCESS_KEY_ID}}
AWS_SECRET_ACCESS_KEY={{AWS_SECRET_ACCESS_KEY}}
AWS_S3_REGION={{AWS_S3_REGION}}
S3_BUCKET_NAME={{S3_BUCKET_NAME}}

S3_BASE_URL={{S3_BASE_URL}}

SENDGRID_API_KEY={{SENDGRID_API_KEY}}
SENDGRID_EMAIL={{SENDGRID_EMAIL}}

JWT_SECRET={{JWT_SECRET}}

GIT_USER={{GIT_USER}}
APP_NAME={{APP_NAME}}
GIT_REPO_URL=https://github.com/$GIT_USER/$APP_NAME.git
APP_ENTRY_POINT=/home/$EC2_USER/$APP_NAME/backend/src # e.g src/index.js


sudo apt-get update

echo -e "\n################\n Initializing NVM Installation\n################\n"

if type -p nvm &>/dev/null; then
    echo -e "\n NVM is already installed.\n"
    # Checking node version
    nvm -v
else

echo -e "\n################\n Installing NVM\n################\n"
# Install nvm with curl
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 

# Activate nvm
# . ~/.nvm/nvm.sh
source ~/.bashrc

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


echo -e "\n################\n NVM installation Completed\n################\n"

fi

echo -e "\n################\n Initializing Node Installation\n################\n"

if type -p node &>/dev/null; then
    echo -e "\n Node is already installed.\n"
    # Checking node version
    node -e "console.log('Running Node.js ' + process.version)"
else

echo -e "\n################\n Installing Node with NVM\n################\n"
# Installing Node16 with nvm
nvm install 18.18.2
echo -e "\n################\n Node Installation Completed!!!\n################\n"

# confirm that node installed successfully and Checking node version
node -e "console.log('Running Node.js ' + process.version)"

fi



if type -p npm &>/dev/null; then
    echo -e "\n NPM is already installed.\n"
    # Checking nginx version
    npm -v
    echo -e "\n################\n NPM Already In Place\n################\n"
else
    echo -e "\n NPM is not installed.\n"

    echo -e "\n################\n Initialising NPM Installation\n################\n"
    sudo apt install npm

    echo -e "\n################\n NPM Installation Completed\n################\n"
    
fi


if [ -d "/home/$EC2_USER/$APP_NAME" ]; then
    # Folder exists, so delete it (empty or not)
    sudo rm -rf  "/home/$EC2_USER/$APP_NAME"
    echo -e "App Folder deleted."
else
    echo -e "App Folder does not exist."
fi

echo -e "\n################\n Cloning The Project Repository \n################\n"
# Clone the project from bitbucket
git clone $GIT_REPO_URL
echo -e "\n################\n Repository Cloning Completed \n################\n"


echo -e "\n################\n Initializing PM2 Installation\n################\n"
npm install pm2@latest -g
echo -e "\n################\n PM2 Installation Completed\n################\n"


# Navigate Into The Source Code Directory
cd /home/$EC2_USER/$APP_NAME/backend

echo -e "\n################\n Initializing App Dependencies Installation\n################\n"
npm install
echo -e "\n################\n App Dependencies Installation Completed\n################\n"


echo -e "\n################\n Writing Into .env file\n################\n"
touch .env
sudo cat >> .env <<EOL
PORT: $PORT

AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
AWS_S3_REGION=$AWS_S3_REGION
S3_BUCKET_NAME=$S3_BUCKET_NAME

S3_BASE_URL=$S3_BASE_URL

SENDGRID_API_KEY=$SENDGRID_API_KEY
SENDGRID_EMAIL=$SENDGRID_EMAIL

JWT_SECRET=$JWT_SECRET
EOL
echo -e "\n################\n .env file Write Operation Completed\n################\n"


echo -e "\n################\n Initializing DB Migration\n################\n"
npx prisma migrate dev --name init
echo -e "\n################\n DB Migration Completed\n################\n"

echo -e "\n################\n Running The Application With PM2\n################\n"
# Running the app in the background with pm2
# sudo pm2 start $APP_ENTRY_POINT
# pm2 start $APP_ENTRY_POINT
pm2 start

echo -e "\n################\n Getting The Application And Its Managed Processes To Launch on System Startup\n################\n"
pm2 start npm --name $APP_NAME -- start

# Setting Up The Startup Script
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USERNAME --hp /home/cyclone
sudo env PATH=$PATH:/home/$EC2_USER/.nvm/versions/node/v18.18.2/bin /home/$EC2_USER/.nvm/versions/node/v18.18.2/lib/node_modules/pm2/bin/pm2 startup systemd -u $APP_NAME --hp /home/$EC2_USER

# Save The Process List And Corresponding Environments
pm2 save

# Start the service
sudo systemctl start pm2-$APP_NAME

echo -e "\n################\n REBOOTING THE SERVER\n################\n"
sudo reboot