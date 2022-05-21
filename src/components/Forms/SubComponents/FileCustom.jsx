import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";


const Input = styled("input")({
    display: "none"
  });
  
  export default function UploadButtons({setFile}) {
    

    return (
        <div className="file-input">
            <label htmlFor="contained-button-file">
                <Input
                    className="list--buttons"
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={(e)=> setFile(e.target.files[0])}
                    />
                <Button variant="contained" component="span" className="list--buttons">
                    Upload Image
                </Button>
            </label>
        
      </div>
    );
  }
  