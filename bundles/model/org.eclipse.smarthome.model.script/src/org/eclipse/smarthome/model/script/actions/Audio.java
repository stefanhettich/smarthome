/**
 * Copyright (c) 2014-2016 by the respective copyright holders.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 */
package org.eclipse.smarthome.model.script.actions;

import java.io.IOException;

import org.eclipse.smarthome.core.audio.AudioException;
import org.eclipse.smarthome.core.library.types.PercentType;
import org.eclipse.smarthome.model.script.engine.action.ActionDoc;
import org.eclipse.smarthome.model.script.engine.action.ParamDoc;
import org.eclipse.smarthome.model.script.internal.engine.action.AudioActionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The static methods of this class are made available as functions in the scripts.
 * This allows a script to use audio features.
 *
 * @author Kai Kreuzer
 */
public class Audio {

    private static final Logger logger = LoggerFactory.getLogger(Audio.class);

    @ActionDoc(text = "plays a sound from the sounds folder to the default sink")
    public static void playSound(@ParamDoc(name = "filename", text = "the filename with extension") String filename) {
        try {
            AudioActionService.audioManager.playFile(filename);
        } catch (AudioException e) {
            logger.warn("Failed playing audio file: {}", e.getMessage());
        }
    }

    @ActionDoc(text = "plays a sound from the sounds folder to the given sink(s)")
    public static void playSound(@ParamDoc(name = "sink", text = "the id of the sink") String sink,
            @ParamDoc(name = "filename", text = "the filename with extension") String filename) {
        try {
            AudioActionService.audioManager.playFile(filename, sink);
        } catch (AudioException e) {
            logger.warn("Failed playing audio file: {}", e.getMessage());
        }
    }

    @ActionDoc(text = "plays an audio stream from an url to the default sink")
    public static synchronized void playStream(
            @ParamDoc(name = "url", text = "the url of the audio stream") String url) {
        try {
            AudioActionService.audioManager.stream(url);
        } catch (AudioException e) {
            logger.warn("Failed streaming audio url: {}", e.getMessage());
        }
    }

    @ActionDoc(text = "plays an audio stream from an url to the given sink(s)")
    public static synchronized void playStream(@ParamDoc(name = "sink", text = "the id of the sink") String sink,
            @ParamDoc(name = "url", text = "the url of the audio stream") String url) {
        try {
            AudioActionService.audioManager.stream(url, sink);
        } catch (AudioException e) {
            logger.warn("Failed streaming audio url: {}", e.getMessage());
        }
    }

    @ActionDoc(text = "gets the master volume", returns = "volume as a float in the range [0,1]")
    public static float getMasterVolume() throws IOException {
        return AudioActionService.audioManager.getVolume(null);
    }

    @ActionDoc(text = "sets the master volume")
    public static void setMasterVolume(
            @ParamDoc(name = "volume", text = "volume in the range [0,1]") final float volume) throws IOException {
        if (volume < 0 || volume > 1) {
            throw new IllegalArgumentException("Volume value must be in the range [0,1]!");
        }
        AudioActionService.audioManager.setVolume(volume, null);
    }

    @ActionDoc(text = "sets the master volume")
    public static void setMasterVolume(@ParamDoc(name = "percent") final PercentType percent) throws IOException {
        setMasterVolume(percent.toBigDecimal().floatValue() / 100f);
    }

    @ActionDoc(text = "increases the master volume")
    public static void increaseMasterVolume(@ParamDoc(name = "percent") final float percent) throws IOException {
        if (percent <= 0 || percent > 100) {
            throw new IllegalArgumentException("Percent must be in the range (0,100]!");
        }
        Float volume = getMasterVolume();
        if (volume == 0) {
            // as increasing 0 by x percent will still be 0, we have to set some initial positive value
            volume = 0.001f;
        }
        float newVolume = volume * (1f + percent / 100f);
        if (newVolume - volume < .01) {
            // the getMasterVolume() may only returns integers, so we have to make sure that we
            // increase the volume level at least by 1%.
            newVolume += .01;
        }
        if (newVolume > 1) {
            newVolume = 1;
        }
        setMasterVolume(newVolume);
    }

    @ActionDoc(text = "decreases the master volume")
    public static void decreaseMasterVolume(@ParamDoc(name = "percent") final float percent) throws IOException {
        if (percent <= 0 || percent > 100) {
            throw new IllegalArgumentException("Percent must be in the range (0,100]!");
        }
        float volume = getMasterVolume();
        float newVolume = volume * (1f - percent / 100f);
        if (newVolume > 0 && volume - newVolume < .01) {
            // the getMasterVolume() may only returns integers, so we have to make sure that we
            // decrease the volume level at least by 1%.
            newVolume -= .01;
        }
        if (newVolume < 0) {
            newVolume = 0;
        }
        setMasterVolume(newVolume);
    }

}
