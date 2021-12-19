public class PianoLegRight : PianoLeg
{
    private bool _isPressed = false;
    private Piano _piano;

    protected override void Start()
    {
        base.Start();
        _piano = transform.root.GetComponent<Piano>();
    }

    public override void OnClick()
    {
        _isPressed = !_isPressed;
        _piano.audioMixer.SetFloat("PianoVolume", _isPressed ? -15f : 0f);

        if (_isPressed)
        {
            StartClickCoroutine(0.25f);
        }
        else
        {
            StartClickBackCoroutine(0.25f);
        }
    }
}