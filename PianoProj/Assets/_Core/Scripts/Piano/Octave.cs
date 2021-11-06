using System.Collections.Generic;
using UnityEngine;

public class Octave : MonoBehaviour
{
    public int octave = 1;

    public Dictionary<string, PianoButton> buttons = new Dictionary<string, PianoButton>();
}
