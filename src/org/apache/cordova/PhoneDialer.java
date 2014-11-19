package org.apache.cordova;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class PhoneDialer extends CordovaPlugin {
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException{	   
		if ("call".equals(action)) {
			try{	        	 
	            Uri number = Uri.parse("tel:" + args.getString(0));
	            Intent callIntent = new Intent(Intent.ACTION_CALL, number); 
	            this.cordova.getActivity().startActivity(callIntent);
	        } catch (Exception e) {

			}      
	        callbackContext.success();
			return true;
			
	    }if ("email".equals(action)) {
	    	
	    	try {
	    		Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts("mailto",args.getString(0), null));
		    	emailIntent.putExtra(Intent.EXTRA_SUBJECT, "EXTRA_SUBJECT");
		    	this.cordova.getActivity().startActivity(Intent.createChooser(emailIntent, "Send email..."));
		    	Log.d("tag",""+args.getString(0));					
			} catch (Exception e) {
				// TODO: handle exception
			}
	    	callbackContext.success();
			return true;
	    	
	    }if ("website".equals(action)) {
	    	try {
	    				this.cordova.getActivity().startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(args.getString(0))));
	    				Log.d("tag",""+args.getString(0));
				
			} catch (Exception e) {
				// TODO: handle exception
			}
	    	callbackContext.success();
			return true;		
	    } 
	    else {

		}
		return false;	    
	}
}
