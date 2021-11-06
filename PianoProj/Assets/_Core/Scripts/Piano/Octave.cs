using System.Collections.Generic;
using UnityEngine;

public class Octave : MonoBehaviour, IHoverable
{
    public int octave = 1;
    public Dictionary<string, PianoButton> buttons = new Dictionary<string, PianoButton>();

    private Piano _piano;

    private void Awake()
    {
        _piano = transform.root.GetComponent<Piano>();
    }

    public void Start()
    {
        // Как же похуй, пишу чтоб работало
        foreach (var pair in buttons)
        {
            foreach (var pianoPair in Piano.KeyCodes)
            {
                if (pair.Key == pianoPair.Value)
                {
                    pair.Value.text.text = pianoPair.Key.ToString();
                }
            }
        }
    }

    public void SetIsSelected(bool selected)
    {
        foreach(var button in buttons.Values)
        {
            button.text.gameObject.SetActive(selected);
        }
    }

    public void OnHover()
    {
        _piano.SelectedOctave = this;
    }
}
