from typing import List
from fastapi import FastAPI, APIRouter, Depends
from fastapi.responses import HTMLResponse

# app = FastAPI()



router = APIRouter(prefix="/button", tags=["button"])

@router.get("/getButton", response_class=HTMLResponse)
async def get_button():
    html_content = """
    <button 
        id="paypath-button"
        style="
            background-color: #090644; 
            color: white; 
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            cursor: pointer;"
    />
        <div style="display:flex; justifyContent:center;">
            <img style="padding-right:12px; width: 30px" src="http://10.112.77.41:8000/static/ap_logo_resized.png" />Pay with PayPath
        </div>
    </button>
    <script>
        document.getElementById('paypath-button').onclick = function()   {
            window.open('http://localhost:3001', '_blank', 'width=300,height=400');
        };
    </script>
    """
    # <button className="paypath-button"
    #     type="button"
    #     onClick={ () => openPayPathModal() }
    # >
    #     <div style={{"display":"flex", "justifyContent":"center"}}>
    #         <img style={{"paddingRight":"12px"}} src={paypath_logo_small} width="30" />Pay with PayPath
    #     </div>
    # </button>
    return HTMLResponse(content=html_content)
